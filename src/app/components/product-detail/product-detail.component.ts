import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  prod: any;
  relateds: any;
  selectedLang:String
  qtyToAdd = 1;
  constructor(
    private productService: ProductService,
    private transltion:TranslateService,
    route: ActivatedRoute,
    private cartService: CartService,
    private toastr:ToastrService,
  ) {
    productService
      .getSingleProd(route.snapshot.params.id)
      .toPromise()
      .then((product: any) => {
        this.prod = product.product;
        this.relateds=product.relativeProducts;
      
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
    this.loadScript("assets/js/jquery.elevatezoom.js");
    this.loadScript("assets/js/scripts.js");
  }
  addToCart() {
    this.prod.quantity = this.qtyToAdd;
    this.cartService.addToCart(this.prod);
  }
  increaseQty() {
    if (this.qtyToAdd>=this.prod.quantity){
      this.toastr.error('Quantity can not be more than available quantity')
      return;
    }
    this.qtyToAdd += 1;
  }
  decreaseQty() {
    if (this.qtyToAdd<1){
      this.qtyToAdd=1
      this.toastr.error('Quantity can not be less than 1')
      return;
    }
    this.qtyToAdd -= 1;
  }
  changeProd(id){
    this.productService.getProdById(id).then(pro=>{
      this.prod=pro;
      scrollTo(0,0)
    })
  }
  loadScript(src: string) {
    setTimeout(() => {
      let sw = document.createElement('script');
      sw.setAttribute('src', src);
      document.getElementsByTagName('body')[0].appendChild(sw);
    }, 1500);
  }
}
let dummyProduct = {
  id: 1,
  user: 'abc',
  price: 34,
  shipping: false,
  quantity: 8,
  reduced: 434,
  name: 'this is something',
  minimumQuantity: 12,
  shortDescription: 'this is a cool project',
  category: 'love',
  color: 'red',
  longDescription:
    'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.',
  image: 'https://i.imgur.com/aybxovW.jpg',
  dimensions: '448: 4” x 4” x 8", RSC bo',
  weight: 112,
  sky: 'sdfs3',
};
