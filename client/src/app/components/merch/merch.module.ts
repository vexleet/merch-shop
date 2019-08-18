import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchDetailsComponent } from './merch-details/merch-details.component';
import { MerchListComponent } from './merch-list/merch-list.component';
import { MerchShopComponent } from './merch-shop/merch-shop.component';
import { CreateMerchComponent } from './create-merch/create-merch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MerchRoutingModule } from './merch-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedPipesModule } from '../../shared/shared-pipes.module';

@NgModule({
  declarations: [
    MerchDetailsComponent,
    MerchListComponent,
    MerchShopComponent,
    CreateMerchComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchRoutingModule,
    FontAwesomeModule,
    SharedPipesModule,
  ],
  exports: [
    MerchListComponent,
  ]
})
export class MerchModule { }
