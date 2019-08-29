import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/models';

@Component({
  selector: 'app-order-all',
  templateUrl: './order-all.component.html',
  styleUrls: ['./order-all.component.scss']
})
export class OrderAllComponent implements OnInit {
  orders: Array<IOrder>;

  constructor(
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.orders = this.route.snapshot.data['orders'];
  }

}
