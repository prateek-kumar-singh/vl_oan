import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isUserLoggedIn;
  private username;
  private user = new BehaviorSubject<string>('');
  cast  = this.user.asObservable();

  constructor(private router : Router) { 
    this.isUserLoggedIn = false;
  }

  setUserLoggedIn()
  {
    this.isUserLoggedIn = true;
  }

  getUserLoggedIn()
  {
    return this.isUserLoggedIn;
  }

  setUserLoggedOut()
  {
    this.isUserLoggedIn = false;
    this.router.navigate(['']);
  }

  editUser(newUser)
  {
    this.user.next(newUser);
  }
}
