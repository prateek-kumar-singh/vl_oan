import { Component, OnInit } from '@angular/core';
import { PurchaserecordService } from '../purchaserecord.service';
import { FormsModule } from '@angular/forms';
import { PurchaseProduct } from '../model/purchaseproduct';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Products } from '../model/products';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';
import {RegistrationService} from '../registration.service';
import { StockDetails } from '../model/stockdetails';
import { StockService } from '../stock.service';
@Component({

  selector: 'app-purchaserecord',
  templateUrl: './purchaserecord.component.html',
  styleUrls: ['./purchaserecord.component.less']

})

export class PurchaserecordComponent implements OnInit {

  purchaseproduct : PurchaseProduct;
  purchaseproductList: PurchaseProduct[];
  isEdit = false;
  products : Products;
  products$ : Observable<Products[]>;
  productsList : Products[];
  showName = false;
  productName : any;
  stockDetails : StockDetails;
  purchasedUnits : number;

  constructor(private purchaserecordService: PurchaserecordService , private registrationService : RegistrationService , private stockService : StockService) { }

  //get purchased product
  getPurchasedProduct()
  {
    var res = this.purchaserecordService.getProduct();
    res.subscribe(response => {
      console.log(response);
      this.purchaseproductList = response;
    })
  }
  ngOnInit() : void{

    this.purchaseproduct = new PurchaseProduct();
    this.purchaseproductList = new Array<PurchaseProduct>();
    this.productsList = new Array<Products>();
    this.products = new Products();
    this.stockDetails = new StockDetails();

   this.getPurchasedProduct(); 

    //get products
    var ress = this.registrationService.getProduct();
    ress.subscribe(response => {
      console.log(response);
      this.productsList = response;
    })

  }

  //add record
  onSubmit() {

    console.log(this.purchaseproduct);

    if(this.isEdit== true) {

      this.purchaseproduct.namen = this.productName;
      this.stockDetails.id  = this.purchaseproduct.pid;
      this.stockDetails.namen = this.purchaseproduct.namen;
      this.stockDetails.category = this.purchaseproduct.category;
      this.stockDetails.company = this.purchaseproduct.company;
      this.stockDetails.purchaseprice = this.purchaseproduct.price;
      
      if(this.purchasedUnits < this.purchaseproduct.units)
      {

        this.stockDetails.units -= this.purchasedUnits;
        this.stockDetails.units += this.purchaseproduct.units;
      }
      else if (this.purchasedUnits > this.purchaseproduct.units)
      {

        this.stockDetails.units -= this.purchasedUnits;
        this.stockDetails.units += this.purchaseproduct.units;
      }
      
      //update record
      this.purchaserecordService.updateProduct(this.purchaseproduct).subscribe(res => {
        this.isEdit = false;
        this.purchaseproduct = new PurchaseProduct();
        console.log(res);
      });

      //update stock details
      var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

      this.purchaseproduct = new PurchaseProduct();

      setTimeout( ()=> this.getPurchasedProduct() , 1200);

      this.isEdit = false;
      this.stockDetails = new StockDetails();
      this.purchasedUnits = null;
      }
     
      else {
      this.purchaseproduct.pid = this.products.id;  
      this.purchaseproduct.namen = this.products.namen;
      this.purchaseproduct.category = this.products.category;
      this.purchaseproduct.company = this.products.company;
      this.stockDetails.id = this.products.id;
      this.stockDetails.namen = this.products.namen;
      this.stockDetails.category = this.products.category;
      this.stockDetails.company = this.products.company;
      this.stockDetails.purchaseprice = this.purchaseproduct.price;
     
      if(this.stockDetails.units == null || this.stockDetails.units == 0)
      {
        this.stockDetails.units = this.purchaseproduct.units;
      }
      else{
      this.stockDetails.units += this.purchaseproduct.units;  
      }
      var x = this.purchaserecordService.addProduct(this.purchaseproduct); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

      //add stock details
      var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

      setTimeout( ()=> this.getPurchasedProduct() , 1200);

      this.products = new Products();
      this.purchaseproduct = new PurchaseProduct();
      this.stockDetails = new StockDetails();
    }
    }

    edit(event: Event) {
      console.log(event);

    }

    //edit record
    editClick(p: any): void {

      this.purchaseproduct = p;
      this.purchasedUnits = p.units;
      this.isEdit = true;
      this.showName = true;
      this.productName = this.purchaseproduct.namen;
    
      //get stock details by id
    var ress = this.stockService.getStockBYId(p.pid);
    ress.subscribe(response => {
      console.log(response);
      this.stockDetails = response;
    })
    }

    //delete record
    delete(purchaseproduct: PurchaseProduct): void {

      this.purchaseproductList = this.purchaseproductList.filter(h => h !== purchaseproduct);
      this.purchaserecordService.deleteProduct(purchaseproduct).subscribe();
    }

    //display searched data and get data 
    addData(id : any)
    {

      var res = this.registrationService.getProductBYId(id);
      res.subscribe(response => {
        console.log(response);
        this.products = response;
      })

      //get stock details by id
    var ress = this.stockService.getStockBYId(id);
    ress.subscribe(response => {
      console.log(response);
      this.stockDetails = response;
    })
    }
}