import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MerchService } from 'src/app/core/services/merch.service';
import { Router } from '@angular/router';
import { IMerch } from 'src/app/core/models';

@Component({
  selector: 'app-create-merch',
  templateUrl: './create-merch.component.html',
  styleUrls: ['./create-merch.component.scss']
})
export class CreateMerchComponent implements OnInit {
  merchCreateForm: FormGroup = this.fb.group({
    merchName: ['', [Validators.required, Validators.minLength(4)]],
    price: ['', [Validators.required, Validators.min(1)]],
    typeOfMerch: ['', [Validators.required]],
    sizes: ['', [Validators.required, Validators.minLength(1)]],
    colors: ['', [Validators.required, Validators.minLength(1)]],
  });

  newMerchDetails: IMerch;

  typesOfMerch: Array<string> = ['Select type of merch', 'Shirt', 'Hat', 'Hoodie'];

  constructor(
    private fb: FormBuilder,
    private merchService: MerchService,
    private router: Router,
    private toastr: ToastrService) { }

  ngOnInit() {
  }

  addDetailsForNewMerch(): void {
    this.merchCreateForm.value.colors = this.merchCreateForm.value.colors
      .split(',')
      .filter(color => color !== '');

    this.merchCreateForm.value.sizes = this.merchCreateForm.value.sizes
      .split(',').filter(size => size !== '')
      .map(size => size.trim());

    this.newMerchDetails = this.merchCreateForm.value;
    this.newMerchDetails['imagesOfMerch'] = {};

    for (const color of this.newMerchDetails.colors) {
      this.merchCreateForm.addControl(color, new FormControl(['', Validators.required]));
    }

  }

  createMerch(): void {
    const keysInForm = Object.keys(this.merchCreateForm.value);

    for (const color of this.newMerchDetails.colors) {
      if (keysInForm.indexOf(color) > -1) {
        this.newMerchDetails['imagesOfMerch'][color] = this.merchCreateForm.get(color).value;
      }
    }

    this.merchService.createMerch(this.newMerchDetails)
      .subscribe((res) => {
        console.log(res);
        if (res['success']) {
          this.toastr.success('You added new merch!');
          this.router.navigate(['/']);
        }
        else {
          this.toastr.error('Something went wrong. Check the input fields');
          this.newMerchDetails = undefined;
        }
      });
  }

  get merchName() {
    return this.merchCreateForm.get('merchName');
  }

  get price() {
    return this.merchCreateForm.get('price');
  }

  get colors() {
    return this.merchCreateForm.get('colors');
  }

  get sizes() {
    return this.merchCreateForm.get('sizes');
  }
}
