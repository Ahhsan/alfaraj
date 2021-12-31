import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService {

  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (request.url===environment.baseurl+'/login'){
     return  next.handle(request);
    }
    else {
    request = request.clone({
      setHeaders: {
        Authorization:`Bearer ${localStorage.getItem('token')}`
      }
    });
    return next.handle(request);
  }
  }

}
