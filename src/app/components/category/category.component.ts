import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent implements OnInit {
  allProds: any;
  catId:String;
  constructor(
    private products: ProductService,
    private cartService: CartService,
    private route:ActivatedRoute
  ) {
    route.params.subscribe(params=>{
      this.catId=params.id;
      console.log(this.catId);
      this.getProds();
      
    })
  }

  ngOnInit(): void {
 
  }
  addToCart(prod) {
    this.cartService.addToCart(prod);
  }
  getProds(){
    this.products.getProdsByCat(this.catId).subscribe((prods) => {
      console.log('All prods: ', prods);
      this.allProds = prods;
    });
  }
}

