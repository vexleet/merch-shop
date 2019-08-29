import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../core/services/cart.service';
import { CheckoutService } from './../../core/services/checkout.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ICartProduct, ICreditCard, IOrder } from 'src/app/core/models';
import { Router } from '@angular/router';
import { OrderService } from 'src/app/core/services/order.service';

declare let paypal: any;
declare let setCookie: any;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @ViewChild('creditCard', { static: true }) creditCardElement: ElementRef;

  informationForm = this.fb.group({
    fullName: ['', [Validators.required]],
    email: ['', [Validators.required]],
    adress: ['', [Validators.required]],
    country: ['', [Validators.required]],
    city: ['', [Validators.required]],
    phone: ['', [Validators.required]],
    postalCode: ['', [Validators.required]],
  });

  paymentForm = this.fb.group({
    cardNumber: [''],
    firstName: [''],
    lastName: [''],
    expDate: [''],
    cvc: ['']
  });

  orderID: string;

  cartProducts: Array<ICartProduct>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private orderService: OrderService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());

    paypal.Buttons({
      createOrder: (data, actions) => {
        return new Promise(resolve => {
          this.checkoutService.createOrderPaypal(this.cartProducts)
            .subscribe((res) => {
              this.orderID = res['orderID'];
              resolve(res['orderID']);
            });
        });
      },

      onApprove: async (data, actions) => {
        this.checkoutService.captureOrderPaypal(this.orderID)
          .subscribe((res) => {
            setCookie('cart', JSON.stringify([]), 30);

            this.toastrService.success('Thank you! Your order has been received.');
            this.router.navigate(['/']);
          });
      }
    }).render(this.paypalElement.nativeElement);
  }

  changePayment(value: string) {
    if (value === 'credit') {
      this.renderer.setStyle(this.creditCardElement.nativeElement, 'display', 'block');
      this.renderer.setStyle(this.paypalElement.nativeElement, 'display', 'none');
    }
    else if (value === 'paypal') {
      this.renderer.setStyle(this.creditCardElement.nativeElement, 'display', 'none');
      this.renderer.setStyle(this.paypalElement.nativeElement, 'display', 'block');
    }
  }

  makePaymentInStripe() {
    const creditCard: ICreditCard = {
      cardNumber: this.paymentForm.get('cardNumber').value,
      name: `${this.paymentForm.get('firstName').value} ${this.paymentForm.get('lastName').value}`,
      expMonth: this.paymentForm.get('expDate').value.split('/')[0],
      expYear: this.paymentForm.get('expDate').value.split('/')[1],
      cvc: this.paymentForm.get('cvc').value,
    };

    const amount: number = Number((this.cartProducts.reduce((a, b) => a + b['price'] * b['quantity'], 0)).toFixed(2));

    this.checkoutService.chargeOrderStripe(creditCard, amount)
      .subscribe((res) => {
        console.log(res);
        const orderBody: IOrder = { ...this.informationForm.value, items: this.cartProducts };

        setCookie('cart', JSON.stringify([]), 30);

        this.orderService.createOrder(orderBody)
          .subscribe((data) => {
            if (data['success']) {
              this.toastrService.success('Thank you! Your order has been received.');
              this.router.navigate(['/']);
            }
            else {
              this.toastrService.error('Something went wrong.');
            }
          });
      });
  }

  get fullName() {
    return this.informationForm.get('fullName');
  }

  get email() {
    return this.informationForm.get('email');
  }

  get adress() {
    return this.informationForm.get('adress');
  }

  get country() {
    return this.informationForm.get('country');
  }

  get city() {
    return this.informationForm.get('city');
  }

  get postalCode() {
    return this.informationForm.get('postalCode');
  }

  get phone() {
    return this.informationForm.get('phone');
  }
}
