import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private router: Router,
    private spinner: SpinnerService
  ) {
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
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
    this.spinner.showSpinner();
    console.log('searching...');
    this.products
      .searchProduct(this.prodToSearch)
      .then((resp) => {
        console.log('found prods: ', resp);
        this.products.setFoundProds(resp);
        this.spinner.hideSpinner();
        this.router.navigate(['/search-result']);
      })
      .catch((error) => {
        this.spinner.hideSpinner();
      });
  }
  loadScript(src: string) {
    setTimeout(() => {
      let sw = document.createElement('script');
      sw.setAttribute('src', src);
      document.getElementsByTagName('body')[0].appendChild(sw);
    }, 1500);
  }
}
