import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {Router} from '@angular/router';
import { LoginService } from '../login.service';
import {Injectable} from '@angular/core';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  username : string;
  showMsgpassword : boolean;
  showMsgusername : boolean;
  showMsg : boolean;
  user : string;
  editUser : string;

 constructor(private router : Router , private loginService : LoginService , private appComponent : AppComponent) { }

 ngOnInit() { 
   this.loginService.cast.subscribe(user => this.user = user)
 }

 loginUser(event)
 {
  event.preventDefault();
  console.log(event);
  var username = event.target.elements[0].value;
  var password = event.target.elements[1].value;

  this.username = username;

  if(username == 'admin' && password == 'admin')
  {
    this.loginService.setUserLoggedIn();
    this.router.navigate(['home']);
    this.appComponent.setLoginDisabled();
  }
  else if(username == 'admin' && password !== 'admin')
  {
    this.showMsgusername = false;
    this.showMsgpassword = true;
    setTimeout(()=>{this.showMsgpassword = false; }, 2000);
  }
  else if (username !== 'admin' && password == 'admin')
  {
    this.showMsgpassword = false;
    this.showMsgusername = true;
    setTimeout(()=>{this.showMsgusername = false; }, 2000);
  }
  else{
    this.showMsgusername = false;
    this.showMsgpassword =false;
    this.showMsg = true;
    setTimeout(()=>{this.showMsg = false; }, 2000);
  }
 }

 editTheUser()
 {
   this.loginService.editUser(this.editUser);
 }
}
