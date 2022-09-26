import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { SalerecordComponent } from './salerecord/salerecord.component';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { SaleProduct } from './model/saleproduct';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class SalerecordService {

  saleproduct : Array<any>;
  private Url = 'http://localhost:8080/SaleProductService/webresources/com.service.soldproduct';

  constructor(private http: HttpClient) { }

  // add product
  addProduct(saleproduct:any):any {

    const url  = `${this.Url}/`;
    return this.http.post<any>(url, saleproduct, httpOptions).pipe(
      map((s: any) => console.log(`added hero w/ name=${s.namen}`),
      error => console.log(error)) // error path)
    );
  }

  //get product
  getProduct() {
   
    return this.http.get(this.Url).pipe(map((res:Array<any>) => 
    this.saleproduct = res));
    
    of(this.saleproduct);
  }

   //update
   updateProduct (saleproduct: SaleProduct):any {

    const url = `${this.Url}/`;
    return this.http.put(url + saleproduct.id , saleproduct, httpOptions).pipe(
      map((s : any) => console.log(`updated hero id=${s.id}`)),
      //catchError(this.handleError('updateProduct'))
    );
  }

  //delete
  deleteProduct (saleproduct: SaleProduct): Observable<SaleProduct> {

    const id = typeof saleproduct === 'number' ? saleproduct : saleproduct.id;
    const url = `${this.Url}/` + saleproduct.id;
  
    return this.http.delete<SaleProduct>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted saleproduct id=${id}`)),
      //catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}