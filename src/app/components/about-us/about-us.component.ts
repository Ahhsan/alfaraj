import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss'],
})
export class AboutUsComponent implements OnInit {
  selectedLang: String;
  constructor(private transltion2: TranslateService) {}

  ngOnInit(): void {
    this.selectedLang = this.transltion2.currentLang;
    this.transltion2.onLangChange.subscribe((lang) => {
      this.selectedLang = lang.lang;

      if (lang.lang === 'en') {
        document.getElementsByTagName('body')[0].style.direction = 'ltr';
      } else {
        document.getElementsByTagName('body')[0].style.direction = 'rtl';
      }
    });
  }
}
