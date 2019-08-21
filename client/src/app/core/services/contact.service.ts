import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  baseUrl: string = 'http://localhost:5000/contact/';

  constructor(
    private http: HttpClient) { }

  sendMail(body) {
    return this.http.post(`${this.baseUrl}/send`, body);
  }
}
