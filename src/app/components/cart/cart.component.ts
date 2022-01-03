import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  grandTotal:number
  cartItems=[];
  selectedLang:String
  constructor(
    private cartService:CartService,
    private transltion:TranslateService
    ) { 
    this.cartItems=this.cartService.getCart();
    this.cartService.totalPayableAmount.subscribe(amount=>{
      this.grandTotal=amount;
      console.log('Cart items: ',this.cartItems);
      
      
    })
  }

  ngOnInit(): void {
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
