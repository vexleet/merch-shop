import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
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
    merchName: [''],
    price: [''],
    typeOfMerch: [''],
    sizes: [''],
    colors: [''],
  });

  newMerchDetails: IMerch;

  typesOfMerch: Array<string> = ['Select type of merch', 'Shirt', 'Hat', 'Hoodie'];

  constructor(
    private fb: FormBuilder,
    private merchService: MerchService,
    private router: Router) { }

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
      this.merchCreateForm.addControl(color, new FormControl(''));
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
        this.router.navigate(['/']);
      });
  }
}
