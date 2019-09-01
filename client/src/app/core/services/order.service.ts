import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IOrder } from '../models';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  private baseUrl = 'http://localhost:5000/order';

  constructor(private http: HttpClient) { }

  createOrder(body: IOrder) {
    return this.http.post(`${this.baseUrl}/create`, body);
  }

  getOrders() {
    return this.http.get<IOrder[]>(`${this.baseUrl}/all`);
  }

  getDetailsOfOrder(orderId: string) {
    return this.http.get<IOrder>(`${this.baseUrl}/details/${orderId}`);
  }

  approveOrder(orderId: string) {
    return this.http.put(`${this.baseUrl}/approve/${orderId}`, {});
  }
}
