import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
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
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService
  ) {
    this.cartItems = this.cartService.getCart();
    console.log('Cart');

    this.cartService.totalPayableAmount.subscribe((amount) => {
      this.grandTotal = amount;
      console.log('grand toal: ', amount);
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
  ngOnInit(): void {}
  onPlaceOrder() {
    this.checkoutForm.value.items = this.cartItems;
    this.checkoutForm.value.price = this.grandTotal;
    this.checkoutForm.value.userId = 3;
    let orderForm={
      orderItems:this.cartItems,
      price:this.grandTotal,
      // userId:JSON.parse(localStorage.getItem('user')).id,
      userId:3,
      shippingAddress:this.checkoutForm.value.shippingAddress,
    }
    this.orderService
      .placeOrder(orderForm)
      .toPromise()
      .then((resp) => {
        this.toastrService.success('Order placed successfully');
        this.checkoutForm.reset();
        this.router.navigate(['/my-account']);
      })
      .catch((error) => {
        this.toastrService.error('An error occurred');
      });
  }
}
