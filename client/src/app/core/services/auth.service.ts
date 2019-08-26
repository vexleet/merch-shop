import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';

declare let setCookie: any;
declare let getCookie: any;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';

  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService) { }

  register(body: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/signup`, body);
  }

  login(body: object): Observable<object> {
    return this.http.post(`${this.baseUrl}/login`, body);
  }

  logout(): boolean {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    return true;
  }

  isAuthenticated(): boolean {
    return !this.jwtHelper.isTokenExpired(this.token);
  }

  isAdmin(): boolean {
    const expectedRole = 'Admin';

    const token = this.token;

    if (token) {
      const tokenPayload = decode(token);

      return tokenPayload.role === expectedRole;
    }

    return false;
  }

  get token(): string {
    return getCookie('token');
  }

  saveUserInfo(res: object): void {
    setCookie('token', res['token'], 30);
    setCookie('username', res['user']['username'], 30);
  }
}
