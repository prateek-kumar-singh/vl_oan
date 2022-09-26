import { Component, OnInit } from '@angular/core';
import { RegistrationService } from './registration.service';
import { FormsModule } from '@angular/forms';
import { StoreName } from './model/storename';
//import { USE_VALUE } from '@angular/core/src/di/injector';
import { AngularWaitBarrier } from 'blocking-proxy/built/lib/angular_wait_barrier';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit{
  storenameList : StoreName[];
  storename : StoreName;
  title = ' VECHILE LOAN MANAGEMENT SYSTEM';
  storenm : string;
  showMsg : boolean;
  disableLogin = false;

  constructor(private registrationService: RegistrationService) { }

  ngOnInit()
  { }

  //get store name
  getName()
  {
    var res = this.registrationService.getStoreName();
    res.subscribe(response => {
      console.log(response);
      this.storename = response;
      this.storenm = this.storename.namen;
      this.showMsg = true;
    })
  }

  removeName()
  {
    this.showMsg = false;
  }

  setLoginDisabled()
  {
    this.disableLogin = true;
  }
}

