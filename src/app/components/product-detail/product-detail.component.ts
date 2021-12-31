import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  prod: any;
  relateds: any;
  constructor(private productService: ProductService, route: ActivatedRoute, private cartService:CartService) {
    console.log(route.snapshot.params.id);
    productService.getProdById(route.snapshot.params.id).then((product) => {
      this.prod = product;
      console.log('product: ', product);
    });
    productService
      .getRelatedProds(route.snapshot.params.id)
      .toPromise()
      .then((relateds) => {
        this.relateds = relateds;
        console.log(this.relateds);
      });
  }

  ngOnInit(): void {}
  addToCart() {
    this.cartService.addToCart(this.prod);
  }
}
