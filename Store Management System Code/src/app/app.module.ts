import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { SalerecordComponent } from './salerecord/salerecord.component';
import { PurchaserecordComponent } from './purchaserecord/purchaserecord.component';
import { StockComponent } from './stock/stock.component';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from './login.service';
import { AuthguardGuard } from './authguard.guard';



@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    LoginComponent,
    HomeComponent,
    SalerecordComponent,
    PurchaserecordComponent,
    StockComponent,
    EmployeedetailsComponent
   
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    FormsModule,
    
    
    
    
  ],
  providers: [LoginService , AuthguardGuard],
  bootstrap: [AppComponent]
})

export class AppModule { }