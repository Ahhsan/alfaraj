import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  placeOrder(data) {
    return this.http.post(environment.baseurl + '/orders', data);
  }
  myOrder(){
    return this.http.get(environment.baseurl+'/orders/my-orders')
  }
}
