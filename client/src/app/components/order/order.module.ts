import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAllComponent } from './order-all/order-all.component';
import { OrderRoutingModule } from './order-routing.module';



@NgModule({
  declarations: [
    OrderAllComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule
  ]
})
export class OrderModule { }
