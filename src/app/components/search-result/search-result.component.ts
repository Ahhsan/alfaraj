import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.scss'],
})
export class SearchResultComponent implements OnInit {
  foundProds;
  constructor(
    private prods: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.prods.foundProds.subscribe((prods) => {
      this.foundProds = prods?.products;
      console.log('found prods: ',this.foundProds);
      
    });
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
}
