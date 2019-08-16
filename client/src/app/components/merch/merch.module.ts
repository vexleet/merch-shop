import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchDetailsComponent } from './merch-details/merch-details.component';
import { MerchListComponent } from './merch-list/merch-list.component';
import { MerchShopComponent } from './merch-shop/merch-shop.component';
import { CreateMerchComponent } from './create-merch/create-merch.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ReplaceSpaces } from 'src/app/core/pipes/replace-spaces.pipe';
import { MerchRoutingModule } from './merch-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    MerchDetailsComponent,
    MerchListComponent,
    MerchShopComponent,
    CreateMerchComponent,
    ReplaceSpaces,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MerchRoutingModule,
    FontAwesomeModule
  ],
  exports: [
    MerchListComponent,
  ]
})
export class MerchModule { }
