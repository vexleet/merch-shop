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

  logout() {
    const cookies = document.cookie.split(";");

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i];
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
      document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }

    return true;
  }

  isAuthenticated() {
    return this.getCookie('token') === null;
  }

  isAdmin() {
    return this.getCookie('isAdmin') === 'true';
  }

  get token() {
    return this.getCookie('token');
  }


  getCookie(key: string) {
    const keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
    return keyValue ? keyValue[2] : null;
  }

  saveUserInfo(res: Object) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (1 * 24 * 60 * 60 * 1000));

    document.cookie = `token = ${res['token']};expires=${expires.toUTCString}`;
    document.cookie = `isAdmin = ${res['user']['roles'].length === 1};expires=${expires.toUTCString}`;
    document.cookie = `username = ${res['user']['username']};expires=${expires.toUTCString}`;
  }
}
