import { CheckoutComponent } from './components/checkout/checkout.component';
import { CartComponent } from './components/cart/cart.component';
import { FetchMerchDetailsResolver } from './core/resolvers/fetch-merch-details.resolver';
import { MerchDetailsComponent } from './components/merch/merch-details/merch-details.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { CreateMerchComponent } from './components/merch/create-merch/create-merch.component';
import { FetchAllMerchResolver } from './core/resolvers/fetch-all-merch.resolver';
import { MerchShopComponent } from './components/merch/merch-shop/merch-shop.component';
import { ContactsComponent } from './components/contacts/contacts.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/home'
  },
  {
    path: 'home',
    component: HomeComponent,
    resolve: {
      merch: FetchAllMerchResolver,
    }
  },
  {
    path: 'account',
    loadChildren: './components/authentication/account.module#AccountModule',
  },
  {
    path: 'collections',
    loadChildren: './components/merch/merch.module#MerchModule',
  },
  {
    path: 'contact-us',
    component: ContactsComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
  },
  {
    path: 'checkout',
    component: CheckoutComponent
  },
  {
    path: 'orders',
    loadChildren: './components/order/order.module#OrderModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
