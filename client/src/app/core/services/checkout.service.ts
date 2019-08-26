import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICreditCard, ICartProduct } from '../models';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = `http://localhost:5000/checkout`;

  constructor(
    private http: HttpClient) { }

  createOrderPaypal(body) {
    return this.http.post(`${this.baseUrl}/paypal/create-order`, body);
  }

  captureOrderPaypal(orderID: string) {
    return this.http.get(`${this.baseUrl}/paypal/capture-order/${orderID}`);
  }

  chargeOrderStripe(creditCard: ICreditCard, amount: number) {
    return this.http.post(`${this.baseUrl}/stripe/charge-card`, { creditCard, amount });
  }
}
