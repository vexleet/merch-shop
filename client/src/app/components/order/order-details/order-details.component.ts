import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { IOrder } from 'src/app/core/models';
import { OrderService } from 'src/app/core/services/order.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {
  order: IOrder;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderService: OrderService,
    private toastr: ToastrService) { }

  ngOnInit() {
    this.order = this.route.snapshot.data.order.data;
  }

  approveOrder() {
    const orderId = this.order._id;

    this.orderService.approveOrder(orderId)
      .subscribe((res) => {
        if (res['success']) {
          this.toastr.success("Order approved!");
          this.router.navigate(['/home']);
        }
        else {
          this.toastr.error(res['message']);
        }
      });
  }

}
