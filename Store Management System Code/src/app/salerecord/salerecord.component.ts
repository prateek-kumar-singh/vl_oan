import { Component, OnInit } from '@angular/core';
import { SalerecordService } from '../salerecord.service';
import { FormsModule } from '@angular/forms';
import { SaleProduct } from '../model/saleproduct';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';
import { Products } from '../model/products';
import { Observable, Subject } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap , filter} from 'rxjs/operators';
import {RegistrationService} from '../registration.service';
import { StockService } from '../stock.service';
import { StockDetails } from '../model/stockdetails';

@Component({

  selector: 'app-salerecord',
  templateUrl: './salerecord.component.html',
  styleUrls: ['./salerecord.component.less']

})

export class SalerecordComponent implements OnInit {

  saleproduct : SaleProduct;
  saleproductList: SaleProduct[];
  isEdit = false;
  products : Products;
  products$ : Observable<Products[]>;
  productsList : Products[];
  showName = false;
  productName : any;
  stockDetails : StockDetails;
  soldUnits : number; 
  disableAdd = false;

  constructor(private salerecordService: SalerecordService , private registrationService : RegistrationService , private stockService : StockService)  {}

  //get sold products
  getSoldProduct()
  {
  var res = this.salerecordService.getProduct();
  res.subscribe(response => {
    console.log(response);
    this.saleproductList = response;
  })
   }

  ngOnInit() {
    
    this.saleproduct = new SaleProduct();
    this.saleproductList = new Array<SaleProduct>();
    this.productsList = new Array<Products>();
    this.stockDetails = new StockDetails();
    this.products = new Products();
    this.getSoldProduct();

    //get products
    var ress = this.registrationService.getProduct();
    ress.subscribe(response => {
      console.log(response);
      this.productsList = response;
    })

   }

  onSubmit()
  {
    console.log(this.saleproduct);

    if(this.isEdit == true) {

      this.saleproduct.namen = this.productName;
      this.stockDetails.id  = this.saleproduct.pid;
      this.stockDetails.namen = this.saleproduct.namen;
      this.stockDetails.category = this.saleproduct.category;
      this.stockDetails.company = this.saleproduct.company;
      this.stockDetails.purchaseprice = this.saleproduct.price;

      if(this.soldUnits < this.saleproduct.units)
      {
        this.stockDetails.units += this.soldUnits;
        this.stockDetails.units -= this.saleproduct.units;
      }
      else if (this.soldUnits > this.saleproduct.units)
      { 
        this.stockDetails.units += this.soldUnits;
        this.stockDetails.units -= this.saleproduct.units;
      }

      //update products
      this.salerecordService.updateProduct(this.saleproduct).subscribe(res => {
        this.isEdit = false;
        this.saleproduct = new SaleProduct();
        console.log(res);
      });

      //update stock details
      var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

      this.saleproduct = new SaleProduct();

      setTimeout( ()=> this.getSoldProduct() , 1200);
      this.isEdit = false;
      this.stockDetails = new StockDetails();
      this.soldUnits = null;
    }
     else { 

        this.saleproduct.pid = this.products.id;
       this.saleproduct.namen = this.products.namen;
        this.saleproduct.category = this.products.category;
        this.saleproduct.company = this.products.company;
        this.stockDetails.id = this.products.id;
        this.stockDetails.namen = this.saleproduct.namen;
        this.stockDetails.category = this.saleproduct.category;
        this.stockDetails.company = this.saleproduct.company;
        this.stockDetails.saleprice = this.saleproduct.price;
        this.stockDetails.units -= this.saleproduct.units;

        var x = this.salerecordService.addProduct(this.saleproduct); //Insert that record to DB
          x.subscribe(res => {
          console.log(res);
        })

      //add stock details
      var x = this.stockService.updateStock(this.stockDetails); //Insert that record to DB
      x.subscribe(res => {
        console.log(res);
      })

        this.products = new Products();
        
        setTimeout( ()=> this.getSoldProduct() , 1200);

        this.saleproduct = new SaleProduct();
        this.stockDetails = new StockDetails();
      }
    }

    edit(event: Event) {
      console.log(event);
    }

    //edit record
    editClick(s: any): void {

      this.saleproduct = s;
      this.soldUnits = s.units;
      this.isEdit = true;
      this.showName = true;
      this.productName = this.saleproduct.namen;
      
       //get stock details by id
      var ress = this.stockService.getStockBYId(s.pid);
      ress.subscribe(response => {
      console.log(response);
      this.stockDetails = response;
    })
    }

    //delete record
    delete( saleproduct: SaleProduct): void {

      this.saleproductList = this.saleproductList.filter(h => h !== saleproduct);
      this.salerecordService.deleteProduct(saleproduct).subscribe();
    }

    //display searched data and get data 
    addData( id : any)
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
      
      if(this.stockDetails.units == 0)
      {
        this.disableAdd = true;
        console.log('true');
      }

    })
    }

    //when unit changed
    unitChanged()
    {
      console.log('unit changed');
      if(this.saleproduct.units > this.stockDetails.units)
      {
        this.disableAdd = true;
      }
      else
      {
        this.disableAdd = false;
      }
    }
  }