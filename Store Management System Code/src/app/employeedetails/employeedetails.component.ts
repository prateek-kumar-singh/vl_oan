import { Component, OnInit } from '@angular/core';
import { EmployeesService } from '../employees.service';
import { FormsModule } from '@angular/forms';
import { EmployeeDetails } from '../model/employeedetails';
//import { USE_VALUE } from '@angular/core/src/di/injector';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-employeedetails',
  templateUrl: './employeedetails.component.html',
  styleUrls: ['./employeedetails.component.less']
})

export class EmployeedetailsComponent implements OnInit {

  employeedetails : EmployeeDetails;
  employeedetailsList: EmployeeDetails[];
  isEdit = false;
  imageUrl : string;
  fileToUpload : File = null;

  constructor(private employeesService: EmployeesService) { }

  ngOnInit() {
    this.employeedetails = new EmployeeDetails;
    this.employeedetailsList = new Array<EmployeeDetails>();
    
    var res = this.employeesService.getEmployees();
    res.subscribe(response => {
      console.log(response);
      this.employeedetailsList = response;
    })
  }

  onSubmit() {

    console.log(this.employeedetails);

    if(this.isEdit== true) {
      this.isEdit = false;

      this.employeesService.updateEmployee(this.employeedetails).subscribe(res => {
        this.isEdit = false;
        this.employeedetails = new EmployeeDetails();
        console.log(res);
      });
      
      var res = this.employeesService.getEmployees();
      res.subscribe(response => {
      console.log(response);
      this.employeedetailsList = response;
    })

    }

    else {

      //this.employeedetailsList.push(this.employeedetails); //To dislay on UI
      var x = this.employeesService.addEmployee(this.employeedetails); //Insert that record to DB

      x.subscribe(res => {
        console.log(res);
      })

      console.log(x);
      this.isEdit = false;
    }

    //get Employees
    setTimeout(()=>{
    var res = this.employeesService.getEmployees();
    res.subscribe(response => {
      console.log(response);
      this.employeedetailsList = response;
    })
  }
  ,1200
    );
    this.employeedetails = new EmployeeDetails();
  }
  
  edit(event: Event) {
    console.log(event);
  }

  //edit record
  editClick(e : any): void {

    this.employeedetails = e;
    this.isEdit = true;
  
  }

  //delete record
  delete(employeedetails: EmployeeDetails): void {

    this.employeedetailsList = this.employeedetailsList.filter(h => h !== this.employeedetails);
    this.employeesService.deleteEmployee(employeedetails).subscribe();
    
    //get product
    var res = this.employeesService.getEmployees();
    res.subscribe(response => {
      console.log(response);
      this.employeedetailsList = response;
    })
  }

}