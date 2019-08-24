import { CartService } from './../../core/services/cart.service';
import { CheckoutService } from './../../core/services/checkout.service';
import { FormBuilder } from '@angular/forms';
import { Component, OnInit, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { ICartProduct } from 'src/app/core/models';

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


  cartProducts: Array<ICartProduct>;

  constructor(
    private fb: FormBuilder,
    private renderer: Renderer2,
    private checkoutService: CheckoutService,
    private cartService: CartService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());

    paypal.Buttons({
      createOrder: (data, actions) => {
        return new Promise(resolve => {
          this.checkoutService.checkOutPaypal(this.cartProducts)
            .subscribe((res) => {
              resolve(res["orderID"]);
            });
        });
      },

      onApprove: async (data, actions) => {
        const order = await actions.order.capture();
        console.log(order);
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
