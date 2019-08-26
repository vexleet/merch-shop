import { Injectable } from '@angular/core';
import { ICartProduct } from '../models';

declare let setCookie: any;
declare let getCookie: any;

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  addProductToCart(productDetails: ICartProduct): void {
    const cart = JSON.parse(getCookie('cart')) || [];
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

    setCookie('cart', JSON.stringify(cart), 30);
  }

  getCartProducts(): string {
    return getCookie('cart');
  }

  changeQuantityOfProduct(quantity: string, productDetails: ICartProduct): void {
    const cart = JSON.parse(getCookie('cart'));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].merchName === productDetails.merchName
        && cart[i].color === productDetails.color
        && cart[i].size === productDetails.size) {
        cart[i].quantity = quantity;

        setCookie("cart", JSON.stringify(cart), 30);
        break;
      }
    }
  }

  removeProduct(merchName: string): void {
    const cart = JSON.parse(getCookie('cart'));

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].merchName === merchName) {
        cart.splice(i, 1);

        setCookie("cart", JSON.stringify(cart), 30);
        break;
      }
    }
  }
}
