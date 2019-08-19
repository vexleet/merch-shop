import { Component, OnInit, DoCheck, AfterViewInit, AfterContentChecked } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, DoCheck {
  isAdmin: boolean;
  isAuthenticated: boolean;
  faShoppingCart = faShoppingCart;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
  }

  ngDoCheck() {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    const hasLoggedOut = this.authService.logout();

    if (hasLoggedOut) {
      this.isAdmin = false;
      this.router.navigate(['/']);
    }
  }

}
