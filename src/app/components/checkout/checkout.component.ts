import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss'],
})
export class CheckoutComponent implements OnInit {
  checkoutForm: FormGroup;
  grandTotal: number;
  cartItems = [];
  selectedLang:String
  tax:number;
  shippingAddress: String;
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService,
    private authService: AuthService,
    private transltion:TranslateService
  ) {
    this.cartItems = this.cartService.getCart();

    this.cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
      this.tax=Math.floor(this.grandTotal*.15);
    });
    this.checkoutForm = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.email],
      street: [''],
      postcode: [''],
      shippingAddress: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required],
    });
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
  async onPlaceOrder() {
    this.authService.checkLogin().then((status) => {
      let orderedProducts=[];
      if (status) {
        this.cartItems.forEach(item=>{
          item.price=item.reduced * item.quantity;
          orderedProducts.push({
            productId:item.id,
            quantity:item.quantity,
            price:item.price,
          })
        })
        this.checkoutForm.value.items = orderedProducts;
        this.checkoutForm.value.price = this.grandTotal;
        this.checkoutForm.value.userId = 3;
        let orderForm = {
          orderItems: orderedProducts,
          price: this.grandTotal+this.tax,
          shippingAddress:
            this.checkoutForm.value.firstName +
            ' ' +
            this.checkoutForm.value.lastName +
            ' ' +
            this.checkoutForm.value.city +
            ' ' +
            this.checkoutForm.value.street +
            ' ' +
            this.checkoutForm.value.postcode +
            ' ' +
            this.checkoutForm.value.shippingAddress +
            ' ' +
            this.checkoutForm.value.country +
            ' ',
        };
        if (orderForm.shippingAddress.trim()===""){
          this.toastrService.error(this.selectedLang==='en' ? 'Please enter address':'الرجاء إدخال العنوان');

          return;
        }
        this.orderService
          .placeOrder(orderForm)
          .toPromise()
          .then((resp) => {
            this.toastrService.success(this.selectedLang==='en' ? 'Order placed successfully':'تم تقديم الطلب بنجاح');
            this.checkoutForm.reset();
            this.cartService.makeCartEmpty();
            this.router.navigate(['/my-account']);
          })
          .catch((error) => {
            this.toastrService.error(this.selectedLang==='en' ? 'An error occurred':'حدث خطأ');
          });
      } else {
        this.toastrService.error(this.selectedLang==='en' ? 'Please log in to place order':'الرجاء تسجيل الدخول لتقديم الطلب');
        return;
      }
    });
  }
}
