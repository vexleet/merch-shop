import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;

    const token = this.authService.token;

    if (!token) {
      this.router.navigate(['/home']);
      return false;
    }

    const tokenPayload = decode(token);

    if (tokenPayload.role !== expectedRole) {
      this.router.navigate(['/home']);
      return false;
    }

    return true;
  }

}
