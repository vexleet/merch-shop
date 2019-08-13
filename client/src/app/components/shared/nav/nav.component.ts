import { Component, OnInit, DoCheck } from '@angular/core';
import { AuthService } from 'src/app/core/auth.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, DoCheck {
  // isAdmin: boolean;
  isAuthenticated: boolean;

  constructor(
    private authService: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  ngDoCheck() {
    this.isAuthenticated = this.authService.isAuthenticated();
    // this.isAdmin = this.authService.isAdmin();
  }

  logout() {
    const hasLoggedOut = this.authService.logout();

    if (hasLoggedOut) {
      this.router.navigate(['/']);
    }
  }

}
