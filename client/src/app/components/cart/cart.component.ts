import { CheckoutService } from './../../core/services/checkout.service';
import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, DoCheck, AfterViewInit } from '@angular/core';
import { ICartProduct } from 'src/app/core/models';

declare let paypal;

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck, AfterViewInit {
  cartProducts: Array<ICartProduct>;

  constructor(
    private cartService: CartService,
    private checkoutService: CheckoutService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());
  }

  ngAfterViewInit() {
    paypal.Buttons({
      createOrder: () => {
        return new Promise(resolve => {
          this.checkoutService.checkOutPaypal(this.cartProducts)
            .subscribe((res) => {
              console.log(res);
              resolve(res["orderID"]);
            });
        });
      },
    }).render('#paypal-button-container');
  }

  ngDoCheck() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());
  }

  changeQuantityOfProduct(quantity: string, productDetails: ICartProduct): void {
    this.cartService.changeQuantityOfProduct(quantity, productDetails);
  }

  removeProduct(merchName: string): void {
    this.cartService.removeProduct(merchName);
  }

}
