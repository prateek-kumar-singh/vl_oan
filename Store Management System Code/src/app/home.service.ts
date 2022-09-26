import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { PurchaseProduct } from './model/purchaseproduct';
import { SaleProduct } from './model/saleproduct';

@Injectable({

  providedIn: 'root'

})

export class HomeService {

  purchaseproduct : Array<any>;
  saleproduct : Array<any>;
  to : number;
  from : number;
  total : number;

  constructor(private http : HttpClient) { }

  //get purchase product
  getpurchaseProduct() {

    return this.http.get("http://localhost:8080/PurchaseProductService/webresources/com.service.purchasedproduct/").pipe(map((res:Array<any>) => 
    this.purchaseproduct = res));
    
    of(this.purchaseproduct);
  }
 
  // get sale product
  getsaleProduct() { 
    return this.http.get("http://localhost:8080/SaleProductService/webresources/com.service.soldproduct/").pipe(map((res:Array<any>) => 
    this.saleproduct = res));
    
    of(this.saleproduct);
  }
}