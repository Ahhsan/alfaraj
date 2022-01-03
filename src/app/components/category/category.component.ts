import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  allProds: any;
  selectedLang:String
  catId:String;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route:ActivatedRoute,
    private transltion:TranslateService
  ) {
    route.params.subscribe(params=>{
      this.catId=params.id;
      this.getProds();
      
    })
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
 
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
  getProds(){
    this.products.getProdsByCat(this.catId).subscribe((prods) => {
      this.allProds = prods;
    });
  }
}

