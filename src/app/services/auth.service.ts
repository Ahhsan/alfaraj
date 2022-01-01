import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  loggedUser = new BehaviorSubject(null);
  constructor(private http: HttpClient, private toastr:ToastrService, private cartService:CartService) {
    this.checkLogin();
  }

  logout() {
    console.log('logginf out');
    this.loggedUser.next(null);
    localStorage.clear();
    this.toastr.success('Logged out');
    this.cartService.makeCartEmpty();
  }
  register(data: any) {
    return this.http.post(environment.baseurl + '/register', data);
  }
  login(data: any) {
    return this.http.post(environment.baseurl + '/login', data);
  }
  sendContactForm(form) {
    return this.http.post(environment.baseurl + '/contact', form);
  }
  checkLogin():Promise<boolean> {
    return new Promise((resolve, reject) => {
      let loggedUsr = localStorage.getItem('user');
      if (loggedUsr) {
        this.loggedUser.next(JSON.parse(loggedUsr));
        console.log('logged in');
        resolve(true)
      } else {
        this.loggedUser.next(JSON.parse(null));
        console.log('not logged in');
        resolve(false)

      }
    });
  }
}
