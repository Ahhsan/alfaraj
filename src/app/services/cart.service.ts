import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  selectedLang ;
  cart: any = [];
  cartItemCount = new BehaviorSubject(0);
  totalPayableAmount = new BehaviorSubject(0);
  constructor(
    private toastr: ToastrService,
    private translateService: TranslateService
  ) // private productService: ProductService,
  {
    this.selectedLang = translateService.currentLang;
    translateService.onLangChange.subscribe(resp => {
      this.selectedLang = resp.lang;
    });
  }

  getCartItemCount() {
    return this.cartItemCount;
  }

  addToCart(product: any) {
 
    console.log(product.quantity, product.availableQuantity);
    
    if (product.quantity>=product.availableQuantity){
      this.toastr.error(this.selectedLang==="en" ? 'Max quantity reached':'وصلت الكمية القصوى');
      return;
    }
    let productsExists: boolean;
    let indexOfProduct: number;
    indexOfProduct = this.cart.findIndex((item) => item.id === product.id);
    if (indexOfProduct === -1) {
      productsExists = false;
      this.cart.push(product);
      if (!product.quantity) {
        product.quantity = 1;
      }
      this.cartItemCount.next(this.cartItemCount.value + 1);
    } else {
      this.cart[indexOfProduct].quantity += 1;
      this.cartItemCount.next(this.cartItemCount.value + 1);
    }
    this.toastr.success(this.selectedLang==='en' ? 'Added to cart': 'تمت الإضافة إلى عربة التسوق');
    this.calculateTotalAmount();
  }

  removeFromCart(productId: number) {
    this.cart.splice(
      this.cart.findIndex((product) => product.id === productId),
      1
    );
    this.cartItemCount.next(this.cartItemCount.value - 1);
    this.calculateTotalAmount();
  }
  makeCartEmpty() {
    this.cart = [];
    this.cartItemCount.next(0);
    this.totalPayableAmount.next(0);
  }
  getCart() {
    // return TEMP_CART;
    return this.cart;
  }
  increaseQty(productId: any, quantity?:number) {
    
    const productIndex = this.cart.findIndex((item) => item.id === productId);
    
    console.log(this.cart[productIndex].quantity, this.cart[productIndex].availableQuantity);
    
    if (this.cart[productIndex].quantity>=this.cart[productIndex].availableQuantity){
      this.toastr.error(this.selectedLang==="en" ? 'Max quantity reached':'وصلت الكمية القصوى');

      return;
    }
    if (quantity){
    this.cart[productIndex].quantity += quantity;
    }
    else {
      this.cart[productIndex].quantity += 1;
    }
    this.calculateTotalAmount();
  }
  decreaseQty(productId: any, quantity?:number) {
    const productIndex = this.cart.findIndex((item) => item.id === productId);
    if (this.cart[productIndex].quantity === 1) {
      if (this.selectedLang === 'en') {
        this.toastr.error('Quantity cannot be less than 1');
      } else {
        this.toastr.error('لا يمكن أن تكون الكمية أقل من 1');
      }
      return;
    }
    if (quantity){
      this.cart[productIndex].quantity -= quantity;
      }
      else {
        this.cart[productIndex].quantity -= 1;
      }
    // this.cart[productIndex].quantity -= 1;
    this.calculateTotalAmount();
  }
  updateQty(productId:any,quantity:number){
    const productIndex = this.cart.findIndex((item) => item.id === productId);
      this.cart[productIndex].quantity = quantity;
      this.calculateTotalAmount();

  }
  calculateTotalAmount() {
    const prices = this.cart.map((prod) => prod.reduced * prod.quantity);
    // const sum = this.deliveryCharges + prices.reduce((sum, val) => sum + val)
    this.totalPayableAmount.next(prices.reduce((sum, val) => sum + val));
    // this.totalPayableAmount.next(sum);
  }
}
