import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  cartProducts;
  price;

  constructor(
    private cartService: CartService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());
  }

  ngDoCheck() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());
  }

  changeQuantityOfProduct(quantity, productDetails) {
    this.cartService.changeQuantityOfProduct(quantity.value, productDetails);
  }

  removeProduct(merchName) {
    this.cartService.removeProduct(merchName);
  }

}
