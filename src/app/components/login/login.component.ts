import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  selectedLang:String
  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService,
    private transltion:TranslateService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

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
  }
  onPressLogin() {
    this.authService
      .login(this.loginForm.value)
      .toPromise()
      .then((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.router.navigate(['/home']);
        this.toastr.success( this.selectedLang==='en' ?  "Logged in successfully" :'تم تسجيل الدخول بنجاح');
        this.authService.loggedUser.next(resp.user);
      }).catch(error=>{
        this.toastr.error( this.selectedLang==='en' ?  "Invalid Credentials" : 'بيانات الاعتماد غير صالحة')

      })
  }
}
