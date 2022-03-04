import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRouting } from './app-routing';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CustomersComponent } from './customers/customers.component';
import { AdressesComponent } from './adresses/adresses.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';

import { AdressesService } from 'src/services/adresses.service';
import { CustomersService } from 'src/services/customers.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CustomersComponent,
    AdressesComponent,
    NavbarComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(AppRouting, {  useHash: true }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CustomersService, AdressesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
