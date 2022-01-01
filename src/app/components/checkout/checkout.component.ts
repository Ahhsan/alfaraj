import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
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
  shippingAddress:String;
  constructor(
    private cartService: CartService,
    private fb: FormBuilder,
    private toastrService: ToastrService,
    private router: Router,
    private orderService: OrderService,
    private authService:AuthService
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
  async onPlaceOrder() {
    console.log('Shpping adderss: ',this.shippingAddress);
    
    this.authService.checkLogin().then(status=>{
      if (status){
        this.checkoutForm.value.items = this.cartItems;
        this.checkoutForm.value.price = this.grandTotal;
        this.checkoutForm.value.userId = 3;
        let orderForm={
          orderItems:this.cartItems,
          price:this.grandTotal,
          shippingAddress:this.shippingAddress,
        }
        this.orderService
          .placeOrder(orderForm)
          .toPromise()
          .then((resp) => {
            this.toastrService.success('Order placed successfully');
            this.checkoutForm.reset();
            this.cartService.makeCartEmpty();
            this.router.navigate(['/my-account']);
          })
          .catch((error) => {
            this.toastrService.error('An error occurred');
          });
      }
      else {
        this.toastrService.error('Please log in to place order')
        return
      }
    })

  }
}
