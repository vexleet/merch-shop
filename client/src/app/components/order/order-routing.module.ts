import { FetchOrderDetailsResolver } from './../../core/resolvers/fetch-order-details.resolver';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { FetchAllOrderResolver } from './../../core/resolvers/fetch-all-order.resolver';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrderAllComponent } from './order-all/order-all.component';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
    {
        path: 'all',
        component: OrderAllComponent,
        resolve: {
            orders: FetchAllOrderResolver,
        },
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'Admin',
        },
    },
    {
        path: 'details/:id',
        component: OrderDetailsComponent,
        resolve: {
            order: FetchOrderDetailsResolver,
        },
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'Admin',
        },
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class OrderRoutingModule { }
