import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(
    private authService: AuthService) { }

  addProductToCart(productDetails) {
    const cart = JSON.parse(this.authService.getCookie('cart')) || [];
    let isInCart = false;
    let indexOfProduct = -1;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].merchName === productDetails.merchName
        && cart[i].color === productDetails.color
        && cart[i].size === productDetails.size) {
        isInCart = true;
        indexOfProduct = i;
        break;
      }
    }

    if (isInCart) {
      cart[indexOfProduct].quantity = Number(cart[indexOfProduct].quantity) + Number(productDetails.quantity);
    }
    else {
      cart.push(productDetails);
    }

    const d = new Date();
    d.setTime(d.getTime() + (365 * 24 * 60 * 60 * 1000));
    const expires = + d.toUTCString();

    document.cookie = `cart = ${JSON.stringify(cart)};expires=${expires};path=/`;
  }

  getCartProducts() {
    return this.authService.getCookie('cart');
  }

  changeQuantityOfProduct(quantity, productDetails) {
    const cart = JSON.parse(this.authService.getCookie('cart'));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].merchName === productDetails.merchName
        && cart[i].color === productDetails.color
        && cart[i].size === productDetails.size) {
        cart[i].quantity = quantity;

        document.cookie = `cart = ${JSON.stringify(cart)}`;
        break;
      }
    }
  }

  removeProduct(merchName) {
    const cart = JSON.parse(this.authService.getCookie('cart'));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].merchName === merchName) {
        cart.splice(i, 1);

        document.cookie = `cart = ${JSON.stringify(cart)}`;
        break;
      }
    }
  }
}
