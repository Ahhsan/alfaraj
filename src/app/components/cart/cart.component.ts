import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  grandTotal:number
  cartItems=[];
  constructor(private cartService:CartService) { 
    this.cartItems=this.cartService.getCart();
    this.cartService.totalPayableAmount.subscribe(amount=>{
      this.grandTotal=amount;
      console.log('grand toal: ',amount);
      
    })
  }

  ngOnInit(): void {
  }
  removeFromCart(prod){
    this.cartService.removeFromCart(prod);
  }
  decreaseQty(prodId){
this.cartService.decreaseQty(prodId)
  }
  increasQty(prodId){
    this.cartService.increaseQty(prodId)

  }
}
