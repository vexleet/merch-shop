import { CartService } from './../../core/services/cart.service';
import { Component, OnInit, OnChanges, DoCheck } from '@angular/core';
import { ICartProduct } from 'src/app/core/models';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit, DoCheck {
  cartProducts: Array<ICartProduct>;

  constructor(
    private cartService: CartService) { }

  ngOnInit() {
    this.cartProducts = JSON.parse(this.cartService.getCartProducts());
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
