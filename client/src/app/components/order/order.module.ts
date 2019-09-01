import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderAllComponent } from './order-all/order-all.component';
import { OrderRoutingModule } from './order-routing.module';
import { SharedPipesModule } from 'src/app/shared/shared-pipes.module';



@NgModule({
  declarations: [
    OrderAllComponent,
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    SharedPipesModule
  ]
})
export class OrderModule { }
