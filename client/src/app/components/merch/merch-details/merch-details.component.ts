import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IMerch } from 'src/app/core/models';

@Component({
  selector: 'app-merch-details',
  templateUrl: './merch-details.component.html',
  styleUrls: ['./merch-details.component.scss']
})
export class MerchDetailsComponent implements OnInit {
  merch: IMerch;
  productForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute) {
    this.merch = this.route.snapshot.data['merchDetails'].data;

    this.productForm = this.fb.group({
      color: [this.merch.colors[0]],
      size: [this.merch.sizes[0]],
      quantity: [1],
    });
  }

  ngOnInit() {
  }

  addToCart() {
    console.log(this.productForm.value);
  }

}
