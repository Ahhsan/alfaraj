import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  grandTotal: number;
  cartItemCount: number;
  constructor(
    private cartService: CartService,
    private productService: ProductService,
    private router: Router,
    private spinner: SpinnerService,
    private authService: AuthService
  ) {
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
  }

  ngOnInit(): void {}
  searchProd() {
    this.spinner.showSpinner();
    console.log('searching...');
    this.productService
      .searchProduct(this.prodToSearch)
      .then((resp) => {
        console.log('found prods: ', resp);
        this.productService.setFoundProds(resp);
        this.spinner.hideSpinner();
        this.router.navigate(['/search-result']);
      })
      .catch((error) => {
        this.spinner.hideSpinner();
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
}
