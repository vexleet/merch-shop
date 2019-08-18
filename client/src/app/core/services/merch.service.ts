import { IMerch } from './../models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MerchService {
  private readonly baseUrl = 'http://localhost:5000/merch';

  constructor(private http: HttpClient) { }

  createMerch(body: IMerch) {
    return this.http.post(`${this.baseUrl}/create`, body);
  }

  getAllMerch() {
    return this.http.get<IMerch[]>(`${this.baseUrl}/all`);
  }

  getDetailsOfMerch(nameOfMerch: string) {
    return this.http.get<IMerch>(`${this.baseUrl}/details/${nameOfMerch}`);
  }

  deleteMerch(nameOfMerch: string) {
    return this.http.delete(`${this.baseUrl}/delete/${nameOfMerch}`);
  }
}
