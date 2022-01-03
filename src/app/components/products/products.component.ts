import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements OnInit {
  allProds: any;
  selectedLang:any;
  cats:any;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private transltion:TranslateService
  ) {}

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
    this.products.allProds.subscribe((prods) => {
      this.allProds = prods;
    });
    this.products.getAllCats().then(categories=>{
      this.cats=categories;
      
    })
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
}
