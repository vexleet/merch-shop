import { ActivatedRoute } from '@angular/router';
import { IMerch } from './../../../core/models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-merch-shop',
  templateUrl: './merch-shop.component.html',
  styleUrls: ['./merch-shop.component.scss']
})
export class MerchShopComponent implements OnInit {
  merch: Array<IMerch>;

  constructor(
    private route: ActivatedRoute) {
    this.merch = this.route.snapshot.data['merch'].data;
  }

  ngOnInit() {
  }

}
