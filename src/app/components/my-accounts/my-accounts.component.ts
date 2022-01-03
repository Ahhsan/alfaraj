import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-accounts',
  templateUrl: './my-accounts.component.html',
  styleUrls: ['./my-accounts.component.scss'],
})
export class MyAccountsComponent implements OnInit {
  myOrders:any;
  selectedLang:String
  constructor(
    private order: OrderService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private toastr:ToastrService,
    private transltion:TranslateService
  ) {
    let lg = localStorage.getItem('user');
    this.loggedInUser = JSON.parse(lg);
    this.userForm = fb.group({
      city: [this.loggedInUser.city, Validators.required],
      email: [this.loggedInUser.city, Validators.email],
      country: [this.loggedInUser.country, Validators.required],
      firstName: [this.loggedInUser.firstName, Validators.required],
      lastName: [this.loggedInUser.lastName, Validators.required],
      phone: [this.loggedInUser.phone, Validators.required],
      postCode: [this.loggedInUser.postCode],
      street: [this.loggedInUser.street],
      password: [this.loggedInUser.password],
      confirmPassword: [this.loggedInUser.confirmPassword],
    });
  }
  loggedInUser: any;
  ordersView = true;
  userForm: FormGroup;
  ngOnInit(): void {
    this.selectedLang = this.transltion.currentLang;
    this.transltion.onLangChange.subscribe(lang => {
      this.selectedLang = lang.lang;
      if (lang.lang==="en"){
        document.getElementsByTagName("body")[0].style.direction="ltr"
      }
      else {
        document.getElementsByTagName("body")[0].style.direction="rtl"

      }
    });
    this.order
      .myOrder()
      .toPromise()
      .then((orders) => {
        this.myOrders=orders;
      });
  }
  logOut() {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}

/* 
city: "pasrur"
country: "jomerzi"
email: "usman@gmail.com"
firstName: "usman"
lastName: "Muhammad"
phone: "22332"
postCode: "ss"
role: "agent"
store: "abc"
street: "ahmed"
 */
