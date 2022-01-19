import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-agents-page',
  templateUrl: './agents-page.component.html',
  styleUrls: ['./agents-page.component.scss'],
})
export class AgentsPageComponent implements OnInit {
  allProds: any;
  cartItemCount: number;
  grandTotal: number;
  storeName:any
  selectedLang:String;
  totalPages = 0;
  totalProducts = 0;
  currentPage = 1;
  productsToShow = 9;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private transltion:TranslateService
  ) {
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
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
    this.storeName=this.route.snapshot.params.id
    this.products
    .getStoreProds(this.storeName,{ page: this.currentPage, limit: this.productsToShow })
    .subscribe((prods:any) => {
      this.allProds = prods.products;
      console.log("all prods of stoer: ",this.allProds);
      
      this.totalPages=Math.ceil(prods.totalProducts/this.productsToShow);
      console.log('Total pages: ',this.totalPages);
      
    });
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
  nextPage() {
    this.products
      .getStoreProds(this.storeName,{ page: this.currentPage + 1, limit: this.productsToShow }).toPromise()
      .then((prods: any) => {
        this.allProds = prods.products;
        this.currentPage += 1;
      scrollTo(0,0)

      });
  }
  previousPage() {
    this.products
      .getStoreProds(this.storeName,{ page: this.currentPage - 1, limit: this.productsToShow }).toPromise()
      .then((prods: any) => {
        this.allProds = prods.products;
        this.currentPage -= 1;
      scrollTo(0,0)

      });
  }
}
