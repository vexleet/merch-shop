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
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'collections',
    loadChildren: './components/merch/merch.module#MerchModule',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
