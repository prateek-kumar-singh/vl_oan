import { Injectable, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { PurchaserecordComponent } from './purchaserecord/purchaserecord.component';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { PurchaseProduct } from './model/purchaseproduct';
import { Products } from './model/products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({

  providedIn: 'root'

})

export class PurchaserecordService {

  purchaseproduct : Array<any>;
  private Url = 'http://localhost:8080/PurchaseProductService/webresources/com.service.purchasedproduct';  // URL to web api

  constructor(private http: HttpClient) { }

  //add product
  addProduct(purchaseproduct:any):any {
    
    const url = `${this.Url}/`;
    return this.http.post<any>(url, purchaseproduct, httpOptions).pipe(
      map((p: any) => console.log(`added hero w/ name=${p.namen}`),
      error => console.log(error)) // error path)
    );
  }

  //get product
  getProduct() {
   
    return this.http.get(this.Url).pipe(map((res:Array<any>) => 
    this.purchaseproduct = res));
    
    of(this.purchaseproduct);
  }

  //update product
  updateProduct (purchaseproduct: PurchaseProduct):any {

    const url = `${this.Url}/`;
    return this.http.put(url + purchaseproduct.id , purchaseproduct, httpOptions).pipe(
      map((p : any) => console.log(`updated hero id=${p.id}`)),
      //catchError(this.handleError('updateProduct'))
    );
  }

  //delete product
  deleteProduct (purchaseproduct: PurchaseProduct): Observable<PurchaseProduct> {

    const id = typeof purchaseproduct === 'number' ? purchaseproduct : purchaseproduct.id;
    const url = `${this.Url}/` + purchaseproduct.id;
  
    return this.http.delete<PurchaseProduct>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted purchaseproduct id=${id}`)),
      //catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}