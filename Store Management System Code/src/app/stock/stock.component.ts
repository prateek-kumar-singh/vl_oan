import { Component, OnInit } from '@angular/core';
import { SalerecordService } from '../salerecord.service';
import { PurchaserecordService } from '../purchaserecord.service';
import { FormsModule } from '@angular/forms';
import { SaleProduct } from '../model/saleproduct';
import { PurchaseProduct } from '../model/purchaseproduct';
//import { USE_VALUE } from '@angular/core/src/di/injector';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { StockDetails } from '../model/stockdetails';
import { Observable } from 'rxjs';
import { StockService } from '../stock.service';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.less']
})
export class StockComponent  {
  loanAmount: number = 200000;
  tenure: number = 10;
  interest: number = 5;
  emi: number = 0;
  
  cal() {
    var outstandingAmount =
      this.loanAmount/9
      Number((this.loanAmount) * (this.interest/(12*100) ) * (Math.pow((1+this.interest/(12*100)),this.tenure/12)))/(Math.pow((1+this.interest/(12*100)),(this.tenure/12-1)));
    this.emi = outstandingAmount / this.tenure;
  }
}