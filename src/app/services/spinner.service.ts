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
    this.currentStatus.next(false);
  }
  showSpinner() {
    this.currentStatus.next(true);
  }
  spinnerStatus() {
    return this.currentStatus;
  }

}