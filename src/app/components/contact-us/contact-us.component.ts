import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
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
  selectedLang:String
  constructor(
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private transltion:TranslateService,
    private spinner:SpinnerService
  ) {
    this.contactForm = fb.group({
      name: ['', Validators.email],
      email: ['', Validators.required],
      phone: [''],
      subject: ['', Validators.required],
      message: ['', Validators.required],
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

  sendForm() {
    this.auth.sendContactForm(this.contactForm.value).toPromise().then(resp=>{
          this.toastr.success('Your message has been sent...')
    }).catch(error=>{
      this.toastr.error('An error occurred while sending message...')

    })
  }
}
