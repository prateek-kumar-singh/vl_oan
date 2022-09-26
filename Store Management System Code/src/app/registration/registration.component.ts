import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../registration.service';
import { FormsModule } from '@angular/forms';
import { StoreName } from '../model/storename';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Products } from '../model/products';
import { LoginService } from '../login.service';
import { AppComponent } from '../app.component';
import { StockService } from '../stock.service';
import { StockDetails } from '../model/stockdetails';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.less']
})

export class RegistrationComponent implements OnInit {

  storename: StoreName;
  products : Products;
  productsList : Products[];
  showMsg : boolean;
  showEdit : boolean;
  isEdit = false;
  username : string;
  stockDetails : StockDetails;

  constructor(private registrationService : RegistrationService , private loginService : LoginService , private appComponent : AppComponent ,private stockService : StockService) {
    this.storename = new StoreName();
    this.storename.id = 1;
    this.products = new Products();
    this.stockDetails = new StockDetails();
  }

  //get products
  getProducts()
  {
    this.productsList = new Array<Products>();
    var res = this.registrationService.getProduct();
    res.subscribe(response => {
      console.log(response);
      this.productsList = response;
    });
  }

  ngOnInit() {  
    
    this.getProducts();

    this.appComponent.getName();

   this.loginService.cast.subscribe(user => this.username = user)
  }

   onSubmit()
   {
     console.log(this.products);
 
     if(this.isEdit == true) {
       this.stockDetails.id = this.products.id;
       this.stockDetails.namen = this.products.namen;
       this.stockDetails.category = this.products.category;
       this.stockDetails.company = this.products.company;

       //update product
       this.registrationService.updateProduct(this.products).subscribe(res => {
         this.isEdit = false;
         this.products = new Products();
         console.log(res);
       })

        //update stock details
        var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
        x.subscribe(res => {
          console.log(res);
        })

      setTimeout( ()=> this.getProducts() , 1200);

      this.isEdit = false;
        this.showEdit = true;
        setTimeout(() => {this.showEdit = false ;}, 1200);
        this.products = new Products();
      } 

      else {
        // add product
       //this.productsList.push(this.products); //To dislay on UI
       var x = this.registrationService.addProduct(this.products); //Insert that record to DB
       x.subscribe(res => {
         console.log(res);
       })

       setTimeout( ()=> {
      this.productsList = new Array<Products>();
       var res = this.registrationService.getProduct();
       res.subscribe(response => {
        console.log(response);
        this.productsList = response;
        this.products = this.productsList[this.productsList.length-1];

        this.stockDetails.id = this.products.id;
        this.stockDetails.namen = this.products.namen;
        this.stockDetails.category = this.products.category;
        this.stockDetails.company = this.products.company;
                
        //add stock details
       var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
       x.subscribe(res => {
         console.log(res);
       })

       this.products = new Products();
       }); }
       , 1200);
       
       this.products = new Products();
       this.isEdit = false;

        this.showMsg = true;

        setTimeout(() => {this.showMsg = false ;}, 1200);
      }
    }
 
    edit(event: Event) {
     console.log(event);
    }
 
    //edit record
    editClick(s: any): void {

     this.products = s;
     this.isEdit = true;

     //get stock details
     var res = this.stockService.getStockBYId(s.id);
    res.subscribe(response => {
      console.log(response);
      this.stockDetails = response;
    });
    }

    //change store name
    changeStoreName()
    {
      this.storename.id = 1;
      var x = this.registrationService.changeName(this.storename); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

      //this.appComponent.getName();

      setTimeout( ()=> this.appComponent.getName() , 1200);
     
      this.storename = new StoreName();
    }

   //delete record
   delete( products : Products): void {
 
     this.productsList = this.productsList.filter(h => h !== products);
     this.registrationService.deleteProduct(products).subscribe();
     this.stockService.deleteStockDetail(products).subscribe();
    }
    
    logoutUser()
    {
      this.loginService.setUserLoggedOut();
      this.appComponent.removeName();
    }
}