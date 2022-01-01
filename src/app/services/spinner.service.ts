import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class SpinnerService {
  currentStatus = new BehaviorSubject(false);
  constructor(private toastr: ToastrService) {}
  hideSpinner() {
    setTimeout(() => {
      this.currentStatus.next(false);
    }, 100);
  }
  showSpinner() {
    this.currentStatus.next(true);
  }
  spinnerStatus() {
    return this.currentStatus;
  }

}