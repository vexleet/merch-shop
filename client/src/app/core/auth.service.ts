import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient) { }

  register(body: Object) {
    return this.http.post(`${this.baseUrl}/signup`, body);
  }

  login(body: Object) {
    return this.http.post(`${this.baseUrl}/login`, body);
  }
}
