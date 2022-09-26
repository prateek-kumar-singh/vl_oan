import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { RegistrationComponent } from './registration/registration.component';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { StoreName } from './model/storename';
import {Products} from './model/products';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({

  providedIn: 'root'

})

export class RegistrationService {
  product : Products;
  products : Array<any>;
  productList = Array<Products>();
  private storeUrl = 'http://localhost:8080/StorenameService/webresources/com.service.storename';
  private productUrl = 'http://localhost:8080/ProductsService/webresources/com.service.productlist';

  

  constructor(private http : HttpClient ) {
    this.productList = new Array<Products>();
   }

  //change store name
  changeName(storename: StoreName) : any {

    const url = `${this.storeUrl}/1`;
    return this.http.put(url, storename , httpOptions).pipe(
      map((s: any) => console.log(`added name w/ namen`),
      error => console.log(error)) // error path)
    );
  }

  //get store name
  getStoreName() {

    const url = `${this.storeUrl}/1`;
    return this.http.get<StoreName>(url).pipe(
      tap(_ => console.log(`fetched name id=1`)),
      //catchError(this.handleError<StoreName>(`getHero id=${id}`))
    );
  }

  //add product
  addProduct(products : any) : any {
    
    const url = `${this.productUrl}/`;
    return this.http.post<any>(url , products , httpOptions).pipe(
      map((p : any) => console.log(`added product w/ name`),
      error => console.log(error)) // error path)
    );
  }

  //get product by id
  getProductBYId(id : any)
  {
    const url = `${this.productUrl}/`;
    return this.http.get<Products>(url + id).pipe(
      tap(_ => console.log(`fetched product id=1`)),
      //catchError(this.handleError<StoreName>(`getHero id=${id}`))
    );
  }

  getProduct()
  { 
    return this.http.get(this.productUrl).pipe(map((res:Array<any>) => 
    this.products = res));
    
    of(this.products);
  }

  //update
  updateProduct (products : Products):any {

    const url = `${this.productUrl}/`;
    return this.http.put(url + products.id , products, httpOptions).pipe(
      map((p : any) => console.log(`updated products id=${p.id}`)),
      //catchError(this.handleError('updateProduct'))
    );
  }

  //delete
  deleteProduct (products : Products): Observable<Products> {

    const id = typeof products === 'number' ? products : products.id;
    const url = `${this.productUrl}/` + products.id;
  
    return this.http.delete<Products>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted product id=${id}`)),
      //catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}