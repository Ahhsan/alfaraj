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
  inCart=false;
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
        let foundInCart=this.cartService.getCartProd(this.prod.id);
        
        if(foundInCart){
          this.qtyToAdd=foundInCart.quantity;
          console.log('qtyTOAdd: ',this.qtyToAdd);
          this.inCart=true;
          
        }
        else {
        this.qtyToAdd=1
        console.log('qtyTOAdd: ',this.qtyToAdd);

        }
      
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
    if (this.qtyToAdd<1){
      if (this.selectedLang === 'en') {
        this.toastr.error('Quantity cannot be less than 1');
      } else {
        this.toastr.error('لا يمكن أن تكون الكمية أقل من 1');
      }
      return;
    }
    this.prod.quantity = this.qtyToAdd;
    this.cartService.addToCart(this.prod);
    this.inCart=true;

  }
  increaseQty() {
    console.log('qty befoer update: ',this.qtyToAdd);
    
    if (this.qtyToAdd>=this.prod.quantity){
      this.toastr.error('Quantity can not be more than available quantity')
      return;
    }
    this.qtyToAdd += 1;
    setTimeout(() => {
      console.log('qty after update: ',this.qtyToAdd);
    }, 3000);

  }
  decreaseQty() {
    if (this.qtyToAdd<=1){
      this.qtyToAdd=1
      this.toastr.error('Quantity can not be less than 1')
      return;
    }
    else { 
      this.qtyToAdd -= 1;
    }
  }
  changeProd(id){
    this.productService.getSingleProd(id).toPromise().then(pro=>{
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

