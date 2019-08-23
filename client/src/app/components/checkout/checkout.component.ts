import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  informationForm = this.fb.group({
    fullName: [''],
    email: [''],
    adress: [''],
    country: [''],
    city: [''],
    phone: [''],
    postalCode: [''],
  });

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
  }

}
