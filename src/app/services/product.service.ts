import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, of } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  cats = new BehaviorSubject([]);
  foundProds = new BehaviorSubject(undefined);

  constructor(private http: HttpClient, private toastr: ToastrService) {
    // return this.http.get(environment.baseurl + '/products/role/subagent');
  
  }
  getProducts(paginationInfo?) {
    if (paginationInfo){
      return this.http.get(environment.baseurl + '/products/role/subagent?page='+paginationInfo.page+'&limit='+paginationInfo.limit);
    }
    else {
      return this.http.get(environment.baseurl + '/products/role/subagent');
      
    }
  }
  getSingleProd(prodId: number) {
    return this.http.get(environment.baseurl + '/products/' + prodId);
  }
  searchProduct(name:String,lang:String) {
    return this.http.get(
      environment.baseurl + '/products/name/' + name+'/?lang='+lang
    );
  }
  setFoundProds(prods) {
    return new Promise((resolve, reject) => {
      this.foundProds.next(prods);
      setTimeout(() => {
        resolve(true);
      }, 500);
    });
  }
  getStoreProds(storeName, paginationinfo?) {
    if (paginationinfo){
      return this.http.get(environment.baseurl + `/products/store/${storeName}?page=${paginationinfo.page}&limit=${paginationinfo.limit}`);
    }
    else {
      return this.http.get(environment.baseurl + `/products/store/${storeName}`);

    }
    
  }
  getAllCats() {
    let allCats = this.cats.value;
    if (allCats.length > 0) {
      return new Promise((resolve, reject) => {
        resolve(allCats);
      });
    } else {
      return this.http.get(environment.baseurl + '/categories').toPromise();
    }
  }
  getProdsByCat(catName: String, paginationinfo?) {


    if (paginationinfo){
      return this.http.get(environment.baseurl + `/products/category/${catName}?page=${paginationinfo.page}&limit=${paginationinfo.limit}`);
    }
    else {
      return this.http.get(environment.baseurl + '/products/category/' + catName);

    }
  }
  setCats(cats) {
    this.cats.next(cats);
  }
}

/* 
let randImgs=[
https://i.imgur.com/p9a0b1D.jpeg',
https://i.imgur.com/D3xvaVL.jpg,
https://i.imgur.com/n17LiWS.jpg,
https://i.imgur.com/PTbVLN6.jpg,
https://i.imgur.com/ncfhHSH.jpg,
https://i.imgur.com/5dRuC3a.jpg,
https://i.imgur.com/nP7Gp7o.jpg,
https://i.imgur.com/r3A7v0V.jpg,
https://i.imgur.com/GvuMJ4w.jpg,
https://i.imgur.com/ZLwWCRK.jpg,
https://i.imgur.com/Un8ZqsH.jpg,
https://i.imgur.com/Fx6n9pm.jpg,
https://i.imgur.com/DNkEthd.jpg,
https://i.imgur.com/xFE5EfU.jpg,
https://i.imgur.com/wb1OM0Z.jpg,
https://i.imgur.com/FiRf4VR.jpg,
https://i.imgur.com/aybxovW.jpg,
]

*/
