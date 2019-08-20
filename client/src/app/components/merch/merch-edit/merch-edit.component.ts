import { ActivatedRoute, Router } from '@angular/router';
import { MerchService } from './../../../core/services/merch.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IMerch } from 'src/app/core/models';

@Component({
  selector: 'app-merch-edit',
  templateUrl: './merch-edit.component.html',
  styleUrls: ['./merch-edit.component.scss']
})
export class MerchEditComponent implements OnInit {
  merchEditForm: FormGroup = this.fb.group({});
  merchDetails: IMerch;
  newDetailsForMerch: IMerch;

  typesOfMerch: Array<string> = ['Select type of merch', 'Shirt', 'Hat', 'Hoodie'];

  merchColorsOfImages: Array<string>;

  nameOfMerch: string;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private merchService: MerchService) { }

  ngOnInit() {
    this.nameOfMerch = this.route.snapshot.params.name;

    this.merchDetails = this.route.snapshot.data['merchDetails'].data

    for (const key of Object.keys(this.merchDetails)) {
      if (key === 'imagesOfMerch') {
        for (const color of Object.keys(this.merchDetails.imagesOfMerch)) {
          this.merchEditForm.addControl(color, new FormControl(this.merchDetails.imagesOfMerch[color]));
        }
      }
      else if (key === 'sizes') {
        this.merchEditForm.addControl(key, new FormControl(this.merchDetails.sizes.join(',')));
      }
      else if (key === 'colors') {
        this.merchEditForm.addControl(key, new FormControl(this.merchDetails.colors.join(',')));
      }
      else {
        this.merchEditForm.addControl(key, new FormControl(this.merchDetails[key]));
      }
    }

    this.merchColorsOfImages = Object.keys(this.merchDetails.imagesOfMerch);
  }

  updateDetailsForMerch() {
    this.merchEditForm.value.colors = this.merchEditForm.value.colors
      .split(',')
      .filter(color => color !== '');

    this.merchEditForm.value.sizes = this.merchEditForm.value.sizes
      .split(',').filter(size => size !== '')
      .map(size => size.trim());

    let bodyForNewDetails = {
      merchName: '',
      price: 0,
      typeOfMerch: '',
      imagesOfMerch: {},
      _id: '',
      sizes: [],
      colors: [],
    };

    for (const key of Object.keys(this.merchEditForm.value)) {
      if (this.merchEditForm.value.colors.includes(key)) {
        bodyForNewDetails['imagesOfMerch'][key] = this.merchEditForm.value[key];
      }
      else {
        bodyForNewDetails[key] = this.merchEditForm.value[key];
      }
    }

    this.newDetailsForMerch = bodyForNewDetails;

    console.log(this.newDetailsForMerch);

    for (const color of this.newDetailsForMerch.colors) {
      if (!this.merchEditForm.get(color)) {
        this.merchEditForm.addControl(color, new FormControl(''));
      }
    }
  }

  editMerch() {
    const keysInForm = Object.keys(this.merchEditForm.value);

    for (const color of this.newDetailsForMerch.colors) {
      if (keysInForm.indexOf(color) > -1) {
        this.newDetailsForMerch['imagesOfMerch'][color] = this.merchEditForm.get(color).value;
      }
    }

    this.merchService
      .editMerch(this.nameOfMerch, this.newDetailsForMerch)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/home']);
      });
  }

}
