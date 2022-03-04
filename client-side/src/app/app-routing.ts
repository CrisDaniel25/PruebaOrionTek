import { Routes } from '@angular/router';

import { CustomersComponent } from './customers/customers.component';
import { AdressesComponent } from './adresses/adresses.component';

export const AppRouting: Routes = [
  {
    path: "",
    component: CustomersComponent,
    pathMatch: "full"
  }
];
