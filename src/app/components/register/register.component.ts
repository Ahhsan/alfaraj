import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userForm: FormGroup;
  selectedLang
  showStoreName = false;
  constructor(
    private auth: AuthService,
    fb: FormBuilder,
    private toastr: ToastrService,
    private transltion:TranslateService
  ) {
    this.userForm = fb.group({
      role: ['customer'],
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
      agreeToTerms:[false],
    });
  }

  ngOnInit(): void {
    

    this.userForm.valueChanges.subscribe((value) => {
      console.log(value);
      
      if (value.role === 'subagent') {
        this.showStoreName = true;
      } else {
        this.showStoreName = false;
      }
    });

    this.selectedLang = this.transltion.currentLang;
    this.transltion.onLangChange.subscribe(lang => {
      this.selectedLang = lang.lang;
    });
  }
  onRegister() {
    console.log(this.userForm.value);

    if (!this.userForm.valid){
      this.toastr.error( this.selectedLang==='en' ?  'Please fill all the mandatory fields' :'يرجى ملء جميع الحقول الإلزامية');
      return;

    }

    if (this.userForm.value.password!==this.userForm.value.confirmPassword){
      this.toastr.error(this.selectedLang==='en' ? 'Password does not match' :'كلمة السر غير متطابقة');

      return;
    }
    
    if (this.userForm.value.role==="subagent" && this.userForm.value.store===""){
      this.toastr.error(this.selectedLang==='en' ? 'Please enter storename':'الرجاء إدخال اسم المتجر');
      return;
    }
    
    if (!this.userForm.value.agreeToTerms){
      this.toastr.error(this.selectedLang==='en' ? 'Please agree to terms':'الرجاء الموافقة على الشروط');
      return;
    }
    // if (this.userForm.value.role==="customer"){
    // }
    delete this.userForm.value.store
    delete this.userForm.value.confirmPassword;
    
    this.auth
      .register(this.userForm.value)
      .toPromise()
      .then((resp) => {
        this.toastr.success(this.selectedLang==='en' ? 'Registered':'مسجل');
        this.userForm.reset();
      })
      .catch((error) => {
        this.toastr.error(this.selectedLang==='en' ? 'Error occurred while registering':"حدث خطأ أثناء التسجيل");
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
