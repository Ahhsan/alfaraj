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
    this.getCart();
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
    this.updateCart();

    this.calculateTotalAmount();
  }

  removeFromCart(productId: number) {
    this.cart.splice(
      this.cart.findIndex((product) => product.id === productId),
      1
    );
    this.cartItemCount.next(this.cartItemCount.value - 1);
    this.calculateTotalAmount();
    this.updateCart();

  }
  makeCartEmpty() {
    this.cart = [];
    this.cartItemCount.next(0);
    this.totalPayableAmount.next(0);
    localStorage.removeItem('cart');

  }
  getCart() {
    let pasrsedCart = JSON.parse(localStorage.getItem('cart'));
    if (pasrsedCart === null) {
      this.cart = [];
    } else {
      this.cart = pasrsedCart;
      console.log('parsedCart: ', this.cart);
      this.calculateTotalAmount();
    }

    this.cartItemCount.next(this.cart.length);
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
    this.updateCart();

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
    this.updateCart();

  }
  updateQty(productId:any,quantity:number){
    const productIndex = this.cart.findIndex((item) => item.id === productId);
      this.cart[productIndex].quantity = quantity;
      this.calculateTotalAmount();
    this.updateCart();


  }
  calculateTotalAmount() {
    const prices = this.cart.map((prod) => prod.reduced * prod.quantity);
    // const sum = this.deliveryCharges + prices.reduce((sum, val) => sum + val)
    this.totalPayableAmount.next(prices.reduce((sum, val) => sum + val));
    // this.totalPayableAmount.next(sum);
  }
  updateCart(cart?: any) {
    if (cart) {
      let stringifiedCart = JSON.stringify(cart);
      localStorage.setItem('cart', stringifiedCart);
    } else {
      let stringifiedCart = JSON.stringify(this.cart);
      localStorage.setItem('cart', stringifiedCart);
    }
  }
  isInCart(prodId){
    const productIndex = this.cart.findIndex((item) => item.id === prodId);
    if (productIndex>-1){
      return true;
    }
    else {
      return false;
    }
    
  }
  getCartProd(prodId){
    const productIndex = this.cart.findIndex((item) => item.id === prodId);
    if (productIndex>-1){
      return this.cart[productIndex];
    }
    else {
      return false;
    }
  }
}
