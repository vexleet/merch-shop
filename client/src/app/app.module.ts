import { JwtModule } from '@auth0/angular-jwt';
import { SharedModule } from './components/shared/shared.module';
import { TokenInterceptor } from './core/interceptors/token.interceptor';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MerchModule } from './components/merch/merch.module';
import { ContactsComponent } from './components/contacts/contacts.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CartComponent } from './components/cart/cart.component';
import { SharedPipesModule } from './shared/shared-pipes.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactsComponent,
    CartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MerchModule,
    SharedModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return document.cookie.match('(^|;) ?' + 'token' + '=([^;]*)(;|$)')[0];
        }
      }
    }),
    SharedPipesModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
