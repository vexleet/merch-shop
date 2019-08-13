import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MerchService } from 'src/app/core/services/merch.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-merch',
  templateUrl: './create-merch.component.html',
  styleUrls: ['./create-merch.component.scss']
})
export class CreateMerchComponent implements OnInit {
  merchCreateForm = this.fb.group({
    merchName: [''],
    price: [''],
    typeOfMerch: [''],
    imagesOfMerch: [''],
    sizes: [''],
    colors: [''],
  });

  typesOfMerch = ['Select type of merch', 'Shirt', 'Hat', 'Hoodie']

  constructor(
    private fb: FormBuilder,
    private merchService: MerchService,
    private router: Router) { }

  ngOnInit() {
  }

  createMerch() {
    this.merchCreateForm.value.colors = this.merchCreateForm.value.colors.split(',').filter(color => color !== '');
    this.merchCreateForm.value.sizes = this.merchCreateForm.value.sizes.split(',').filter(size => size !== '');

    this.merchService.createMerch(this.merchCreateForm.value)
      .subscribe((res) => {
        console.log(res);
        this.router.navigate(['/']);
      });
  }
}
