import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = 'http://localhost:5000/auth';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) { }

  register(body: Object): Observable<object> {
    return this.http.post(`${this.baseUrl}/signup`, body);
  }

  login(body: Object): Observable<object> {
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
    return this.getCookie('token');
  }


  getCookie(key: string): string {
    const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }

  saveUserInfo(res: Object): void {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));

    document.cookie = `token = ${res['token']};expires=${expires.toUTCString}`;
    document.cookie = `username = ${res['user']['username']};expires=${expires.toUTCString}`;
  }
}
