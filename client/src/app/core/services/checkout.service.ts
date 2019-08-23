import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private baseUrl = `http://localhost:5000/checkout`;

  constructor(
    private http: HttpClient) { }

  checkOutPaypal(body) {
    return this.http.post(`${this.baseUrl}/paypal`, body);
  }
}
