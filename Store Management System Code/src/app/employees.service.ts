import { Injectable } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { EmployeedetailsComponent } from './employeedetails/employeedetails.component';
import { Observable, of } from 'rxjs';
import { map, filter, scan, tap, catchError } from 'rxjs/operators';
import { EmployeeDetails } from './model/employeedetails';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({

  providedIn: 'root'

})

export class EmployeesService {

  employeedetails : Array<any>;
  private Url = 'http://localhost:8080/EmployeesService/webresources/com.service.employeedetails';

  constructor(private http: HttpClient) { }

  //add
  addEmployee(employeedetails:any):any {
    
    const url = `${this.Url}/`;
    return this.http.post<any>(url, employeedetails, httpOptions).pipe(
      map((e: any) => console.log(`added employee successfully`),
      error => console.log(error)) // error path)
   
    );
  }

  //get 
  getEmployees() {
   
    return this.http.get(this.Url).pipe(map((res:Array<any>) => 
    this.employeedetails = res));
    
    of(this.employeedetails);
  }

  //update
  updateEmployee (employeedetails: EmployeeDetails):any {

    const url = `${this.Url}/`;
    return this.http.put(url + employeedetails.id , employeedetails, httpOptions).pipe(
      map((e : any) => console.log(`updated hero id`)),
      //catchError(this.handleError('updateProduct'))
    );
  }

  //delete
  deleteEmployee (employeedetails: EmployeeDetails): Observable<EmployeeDetails> {

    const id = typeof employeedetails === 'number' ? employeedetails : employeedetails.id;
    const url = `${this.Url}/` + employeedetails.id;
  
    return this.http.delete<EmployeeDetails>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted employeedetails id=${id}`)),
      //catchError(this.handleError<Hero>('deleteHero'))
    );
  }
}