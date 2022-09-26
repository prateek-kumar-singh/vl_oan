import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SalerecordComponent } from './salerecord/salerecord.component';
import {  PurchaserecordComponent } from './purchaserecord/purchaserecord.component';
import { RegistrationComponent } from './registration/registration.component';
import {  EmployeedetailsComponent} from './employeedetails/employeedetails.component';
import { StockComponent } from './stock/stock.component';
import { AuthguardGuard } from './authguard.guard';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'home', component: HomeComponent , canActivate : [AuthguardGuard]},
  { path: 'salerecord', component: SalerecordComponent , canActivate : [AuthguardGuard]},
  { path: 'purchaserecord', component:  PurchaserecordComponent , canActivate : [AuthguardGuard]},
  { path: 'registration', component: RegistrationComponent , canActivate : [AuthguardGuard]},
  { path: 'employeedetails', component: EmployeedetailsComponent , canActivate : [AuthguardGuard]},
  { path: 'stock', component: StockComponent , canActivate : [AuthguardGuard]}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }