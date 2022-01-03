import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';
import { SpinnerService } from 'src/app/services/spinner.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  prodToSearch = '';
  categories:any;
  grandTotal: number;
  selectedLang:String
  cartItemCount: number;
  @Input() showCats:boolean=false;

  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private spinner: SpinnerService,
    private authService: AuthService,
    private transltion:TranslateService,
  ) {
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    this.productService.getAllCats().then(cats=>{
      this.categories=cats;
      
    })
  }

  ngOnInit(): void {

    this.selectedLang = this.transltion.currentLang;
    this.transltion.onLangChange.subscribe(lang => {
      this.selectedLang = lang.lang;
    });
  }
  searchProd() {
    this.productService
      .searchProduct(this.prodToSearch).toPromise()
      .then((resp) => {
        this.productService.setFoundProds(resp);
        this.spinner.hideSpinner();
        this.router.navigate(['/search-result']);
      })
      .catch((error) => {

      });
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
  changeLang(langName){
    this.transltion.use(langName);
    console.log('change to lang: ',langName);
    
  }
}
