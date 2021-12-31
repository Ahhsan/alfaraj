import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private authService: AuthService,
    fb: FormBuilder,
    private router:Router,
    private toastr: ToastrService
  ) {
    this.loginForm = fb.group({
      username: ['', Validators.email],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}
  onPressLogin() {
    this.authService
      .login(this.loginForm.value)
      .toPromise()
      .then((resp: any) => {
        localStorage.setItem('token', resp.token);
        localStorage.setItem('user', JSON.stringify(resp.user));
        this.router.navigate(['/home']);
        this.toastr.success("Logged in successfully");
        this.authService.loggedUser.next(resp.user);
      }).catch(error=>{
        this.toastr.error("Invalid Credentials")

      })
  }
}
