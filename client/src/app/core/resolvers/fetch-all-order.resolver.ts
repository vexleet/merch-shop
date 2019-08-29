import { Injectable } from '@angular/core';
import { IOrder } from '../models';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OrderService } from '../services/order.service';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FetchAllOrderResolver implements Resolve<IOrder[]> {

    constructor(private orderService: OrderService) { }

    resolve(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<IOrder[]> {
        return this.orderService.getOrders();
    }
}