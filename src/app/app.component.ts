import { Component } from '@angular/core';
import { SpinnerService } from './services/spinner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  showSpinner = false;
  constructor(private spinnerService: SpinnerService) {
    this.spinnerService.currentStatus.subscribe((status: any) => {
      this.showSpinner = status;
    });
  }
}
