import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute
  ) {
    cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
    });
    cartService.cartItemCount.subscribe((items) => {
      this.cartItemCount = items;
    });
  }
  ngOnInit(): void {
    this.storeName=this.route.snapshot.params.id
    this.products
      .getStoreProds(this.route.snapshot.params.id)
      .subscribe((prods) => {
        console.log('All prods: ', prods);
        this.allProds = prods;
      });
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
}
