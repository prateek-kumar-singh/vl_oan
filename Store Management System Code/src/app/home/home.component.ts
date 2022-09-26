import { Component, OnInit } from '@angular/core';
import {HomeService} from '../home.service';
import { FormsModule } from '@angular/forms';
import { PurchaseProduct } from '../model/purchaseproduct';
import {SaleProduct} from '../model/saleproduct';
//import { USE_VALUE } from '@angular/core/src/di/injector';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { AppComponent } from '../app.component';

@Component({

  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']

})

export class HomeComponent implements OnInit {

  purchaseproduct : PurchaseProduct;
  purchaseproductList : PurchaseProduct[];
  saleproduct : SaleProduct;
  saleproductList : SaleProduct[];

  constructor(private homeservice : HomeService , private appcomponent : AppComponent) { }
  
  ngOnInit() {
   
    //purchase product get
    this.purchaseproduct = new PurchaseProduct();
    this.purchaseproductList = new Array<PurchaseProduct>();
    
    var res = this.homeservice.getpurchaseProduct();
    res.subscribe(response => {
      console.log(response);
      this.purchaseproductList = response;
    })

   //sale product get
   this.saleproduct = new SaleProduct();
   this.saleproductList = new Array<SaleProduct>();
   
    var res = this.homeservice.getsaleProduct();
    res.subscribe(response => {
      console.log(response);
      this.saleproductList = response;
    })
    this.appcomponent.getName();
  }
}