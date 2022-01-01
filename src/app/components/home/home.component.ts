import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  allProds = [];
  prodToSearch = '';
  cartItemCount: number;
  grandTotal: number;
  categories:any;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private router: Router,
    private spinner: SpinnerService,
    private authService:AuthService
  ) {
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
    this.products.getAllCats().toPromise().then(cats=>{
      this.categories=cats;
     
      
    })
  }
  ngOnInit(): void {
    this.products.allProds.subscribe((prods) => {
      console.log('All prods: ', prods);
      this.allProds = prods;
    });
    // this.loadScript('assets/owlcarousel/js/owl.carousel.min.js');
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
  searchProd() {
    console.log('searching...');
    this.products
      .searchProduct(this.prodToSearch).toPromise()
      .then((resp) => {
        console.log('found prods: ', resp);
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
