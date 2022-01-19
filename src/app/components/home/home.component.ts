import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AppComponent } from 'src/app/app.component';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  allProds:any;
  prodToSearch = '';
  cartItemCount: number;
  grandTotal: number;
  categories:any;
  selectedLang:String;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private router: Router,
    private spinner: SpinnerService,
    public transltion:TranslateService,
    private authService:AuthService
  ) {
    // super();
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
    this.products.getAllCats().then(cats=>{
      this.categories=cats;
      this.products.setCats(cats);
    })
  }
  ngOnInit(): void {
    this.products.getProducts({page:1,limit:8}).subscribe((prods:any) => {
      console.log("prods resp: ",prods);
      
      this.allProds = prods.products;
    });
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
  searchProd() {
    this.products
      .searchProduct(this.prodToSearch,this.selectedLang).toPromise()
      .then((resp) => {
        this.products.setFoundProds(resp);
        this.spinner.hideSpinner();
        this.router.navigate(['/search-result']);
      })
      .catch((error) => {
      });
  }
  loadScript(src: string) {
    setTimeout(() => {
      let sw = document.createElement('script');
      sw.setAttribute('src', src);
      document.getElementsByTagName('body')[0].appendChild(sw);
    }, 1500);
  }
  onClickuser() {
    this.authService.checkLogin().then((status) => {
      if (status) {
        this.router.navigate(['/my-account']);
      } else {
        this.router.navigate(['/login']);
      }
    });
  }
  
}
