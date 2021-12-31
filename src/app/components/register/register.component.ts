import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  showStoreName = false;
  constructor(
    private auth: AuthService,
    fb: FormBuilder,
    private toastr: ToastrService
  ) {
    this.userForm = fb.group({
      role: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      street: [''],
      postcode: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
      store: [''],
      userName: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.userForm.valueChanges.subscribe((value) => {
      console.log('Value: ', value);
      if (value.role === 'subagent') {
        this.showStoreName = true;
      } else {
        this.showStoreName = false;
      }
    });
  }
  onRegister() {
    if (!this.userForm.valid){
      this.toastr.error('Please fill all the mandatory fields');
      return;

    }
    delete this.userForm.value.userName;
    delete this.userForm.value.confirmPassword;
    this.auth
      .register(this.userForm.value)
      .toPromise()
      .then((resp) => {
        console.log('register resp: ', resp);
        this.toastr.success('Registered');
        this.userForm.reset();
      })
      .catch((error) => {
        this.toastr.error('Error occurred while registering');
        console.log('Error: ', error);
      });
  }
}
/* 
    "role": "agent",  //(agent/customer)
    "firstName": "usman",
    "lastName": "Muhammad",
    "email":"m.usman5991@gmail.com",
    "password":"dev",
    "street":"ahmed", //nullable
    "postcode":"ss", //nullable
    "city":"pasrur", //nullable
    "country":"jomerzi", //nullable
     "phone":"22332", 
     "store": "abc", //Nullable
     "userName":"kuchdb"

 */
