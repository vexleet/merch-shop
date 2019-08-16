import { CartService } from './../../../core/services/cart.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IMerch } from 'src/app/core/models';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-merch-details',
  templateUrl: './merch-details.component.html',
  styleUrls: ['./merch-details.component.scss']
})
export class MerchDetailsComponent implements OnInit {
  merch: IMerch;
  productForm: FormGroup;
  faTimes = faTimes;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private cartService: CartService) {
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
    const productDetails = {
      color: this.productForm.get('color').value,
      size: this.productForm.get('size').value,
      quantity: this.productForm.get('quantity').value,
      merchName: this.merch.merchName,
      price: this.merch.price,
      merchImage: this.merch.imagesOfMerch[0],
    };

    document.getElementById('notification').style.height = '45px';
    document.getElementById('notification').style.padding = '0.5em 0';
    document.getElementById('remove-notification').style.opacity = '1';

    this.cartService.addProductToCart(productDetails);
  }

  removeNotification() {
    document.getElementById('notification').style.height = '0';
    document.getElementById('notification').style.padding = '0';
    document.getElementById('remove-notification').style.opacity = '0';
  }

}
