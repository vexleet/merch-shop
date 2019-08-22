import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
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

  registerForm: FormGroup = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    repeatPassword: ['']
  });

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  register(): void {
    this.authService.register(this.registerForm.value)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe((res) => {
        this.toastr.success(res['message']);
        this.router.navigate(['/account/login']);
      });
  }

}
