import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAllComponent } from './order-all/order-all.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';
import { OrderDetailsComponent } from './order-details/order-details.component';



@NgModule({
  declarations: [
    OrderAllComponent,
    OrderDetailsComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedPipesModule
  ]
})
export class OrderModule { }
