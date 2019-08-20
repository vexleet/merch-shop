import { MerchDetailsComponent } from './merch-details/merch-details.component';
import { FetchAllMerchResolver } from './../../core/resolvers/fetch-all-merch.resolver';
import { MerchShopComponent } from './merch-shop/merch-shop.component';
import { CreateMerchComponent } from './create-merch/create-merch.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchMerchDetailsResolver } from 'src/app/core/resolvers/fetch-merch-details.resolver';
import { RoleGuard } from 'src/app/core/guards/role.guard';
import { MerchEditComponent } from './merch-edit/merch-edit.component';


const routes: Routes = [
    {
        path: 'add',
        component: CreateMerchComponent,
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'Admin',
        }
    },
    {
        path: 'all',
        component: MerchShopComponent,
        resolve: {
            merch: FetchAllMerchResolver,
        }
    },
    {
        path: 'details/:name',
        component: MerchDetailsComponent,
        resolve: {
            merchDetails: FetchMerchDetailsResolver,
        }
    },
    {
        path: 'edit/:name',
        component: MerchEditComponent,
        resolve: {
            merchDetails: FetchMerchDetailsResolver,
        },
        canActivate: [RoleGuard],
        data: {
            expectedRole: 'Admin',
        }
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MerchRoutingModule { }