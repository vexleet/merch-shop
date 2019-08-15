import { MerchDetailsComponent } from './merch-details/merch-details.component';
import { FetchAllMerchResolver } from './../../core/resolvers/fetch-all-merch.resolver';
import { MerchShopComponent } from './merch-shop/merch-shop.component';
import { CreateMerchComponent } from './create-merch/create-merch.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FetchMerchDetailsResolver } from 'src/app/core/resolvers/fetch-merch-details.resolver';


const routes: Routes = [
    {
        path: 'add',
        component: CreateMerchComponent,
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
    }
];

@NgModule({
    exports: [RouterModule],
    imports: [RouterModule.forChild(routes)]
})
export class MerchRoutingModule { }