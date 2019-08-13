import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {
  private ngUnsubscribe = new Subject();

  registerForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    repeatPassword: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  register() {
    this.authService.register(this.registerForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/login']);
      });
  }

}
