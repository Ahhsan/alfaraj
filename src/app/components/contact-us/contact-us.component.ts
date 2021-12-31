import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  contactForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private spinner:SpinnerService
  ) {
    this.contactForm = fb.group({
      name: ['', Validators.email],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      subject: ['', Validators.required],
      message: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  sendForm() {
    this.spinner.showSpinner();
    setTimeout(() => {
    this.spinner.hideSpinner();
      this.toastr.success('Your message has been sent...')
    }, 2500);
    // this.auth.sendContactForm(this.contactForm.value).toPromise().then(resp=>{
    // })
  }
}
