import { Component, OnInit } from '@angular/core';
import { dish } from '../shared/dish';
import { CartService } from '../services/cart.service'
import { NgModule } from '@angular/core';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cart: dish[];

  constructor( private cartService: CartService) { }
  quantity: number;
  ngOnInit(): void {
    this.cartService.getCartItems().subscribe(cart => this.cart = cart);
  }
  

}
