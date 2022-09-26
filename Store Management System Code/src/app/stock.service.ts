import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { StockComponent } from './stock/stock.component';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { StockDetails } from './model/stockdetails';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class StockService {

  stockDetails : Array<any>;
  private Url = 'http://localhost:8080/StockService/webresources/com.service.stock';

  constructor(private http: HttpClient) { }

  //get stock details 
  getStock() {
   
    return this.http.get(this.Url).pipe(map((res:Array<any>) => 
    this.stockDetails = res));
    
    of(this.stockDetails);
  }

  //get stock details by id
  getStockBYId(id : any)
  {
    const url = `${this.Url}/`;
    return this.http.get<StockDetails>(url + id).pipe(
      tap(_ => console.log(`fetched stock details id`)),
      //catchError(this.handleError<StoreName>(`getHero id=${id}`))
    );
  }

  //add stock details
  addStockDetails(stockDetails : StockDetails ):any {
    
    const url = `${this.Url}/`;
    return this.http.post<any>(url + stockDetails.id , stockDetails, httpOptions).pipe(
      map((e: any) => console.log(`added stock successfully`),
      error => console.log(error)) // error path)
    );
  }

  //update stock details
  updateStock (stockDetails : StockDetails) : any {

    const url = `${this.Url}/`;
    return this.http.put(url + stockDetails.id , stockDetails, httpOptions).pipe(
      map((e : any) => console.log(`updated stock successfully`)),
      //catchError(this.handleError('updateProduct'))
    );
  }

  //delete stock details
  deleteStockDetail (stockDetails : any) : Observable<StockDetails> {

    const id = typeof stockDetails === 'number' ? stockDetails : stockDetails.id;
    const url = `${this.Url}/` + stockDetails.id;
  
    return this.http.delete<StockDetails>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted stock id=${id}`)),
      //catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}
