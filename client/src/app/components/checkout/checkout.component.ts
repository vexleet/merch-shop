import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../core/services/cart.service';
import { CheckoutService } from './../../core/services/checkout.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ICartProduct } from 'src/app/core/models';
import { Router } from '@angular/router';

declare let paypal;

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @ViewChild('paypal', { static: true }) paypalElement: ElementRef;
  @ViewChild('creditCard', { static: true }) creditCardElement: ElementRef;

  informationForm = this.fb.group({
    fullName: [''],
    email: [''],
    adress: [''],
    country: [''],
    city: [''],
    phone: [''],
    postalCode: [''],
  });

  paymentForm = this.fb.group({
    cardNumber: [''],
    expDate: [''],
    securityCode: ['']
  });

  orderID: string;

  cartProducts: Array<ICartProduct>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private renderer: Renderer2,
    private checkoutService: CheckoutService,
    private cartService: CartService,
    private toastrService: ToastrService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());

    paypal.Buttons({
      createOrder: (data, actions) => {
        return new Promise(resolve => {
          this.checkoutService.createOrderPaypal(this.cartProducts)
            .subscribe((res) => {
              this.orderID = res["orderID"];
              resolve(res["orderID"]);
            });
        });
      },

      onApprove: async (data, actions) => {
        this.checkoutService.captureOrderPaypal(this.orderID)
          .subscribe((res) => {
            document.cookie = 'cart = []';

            this.toastrService.success('Thank you! Your order has been received.');
            this.router.navigate(['/']);
          });
      }
    }).render(this.paypalElement.nativeElement);
  }

  changePayment(value: string) {
    if (value === 'credit') {
      this.renderer.setStyle(this.creditCardElement.nativeElement, "display", "block");
      this.renderer.setStyle(this.paypalElement.nativeElement, "display", "none");
    }
    else if (value === 'paypal') {
      this.renderer.setStyle(this.creditCardElement.nativeElement, "display", "none");
      this.renderer.setStyle(this.paypalElement.nativeElement, "display", "block");
    }
  }

}
