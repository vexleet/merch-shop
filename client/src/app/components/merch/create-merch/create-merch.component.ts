import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MerchService } from 'src/app/core/services/merch.service';
import { Router } from '@angular/router';

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
    imagesOfMerch: [''],
    sizes: [''],
    colors: [''],
  });

  typesOfMerch: Array<string> = ['Select type of merch', 'Shirt', 'Hat', 'Hoodie'];

  constructor(
    private fb: FormBuilder,
    private merchService: MerchService,
    private router: Router) { }

  ngOnInit() {
  }

  createMerch(): void {
    this.merchCreateForm.value.colors = this.merchCreateForm.value.colors
      .split(',')
      .filter(color => color !== '');

    this.merchCreateForm.value.sizes = this.merchCreateForm.value.sizes
      .split(',').filter(size => size !== '')
      .map(size => size.trim());


    this.merchService.createMerch(this.merchCreateForm.value)
      .subscribe((res) => {
        this.router.navigate(['/']);
      });
  }
}
