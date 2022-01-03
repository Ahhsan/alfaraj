import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSpinner = false;
  constructor(
    private spinnerService?: SpinnerService,
     public transltion?: TranslateService
  ) {
    transltion.setDefaultLang('en');
    transltion.use('en');

    this.spinnerService.currentStatus.subscribe((status: any) => {
      this.showSpinner = status;
    });
  }
}
