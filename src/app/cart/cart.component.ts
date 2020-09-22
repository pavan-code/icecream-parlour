import { Component, OnInit } from '@angular/core';
import { dish } from '../shared/dish';
import { CartService } from '../services/cart.service'
import { DishserviceService } from '../services/dishservice.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { expand}  from '../app.animation'
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  animations: [
    expand()
  ]
})
export class CartComponent implements OnInit {
  cart: dish[];
  updatedDish: dish;
  empty: boolean = false;
  totalCost: number;
  constructor(private cartService: CartService,
    private dishService: DishserviceService,
    private snackBar: MatSnackBar) { }
  // quantity: number;
  ngOnInit(): void {
    this.cartService.getCartItems()
    .subscribe(cart => {
      console.log(cart)
        this.cart = cart
        this.findTotalCost();
        this.empty = this.isEmpty(this.cart);
        // this.empty = false
      }, err => {
        // console.log(err);        
        this.empty = true
      });
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  remove(id: string) {
    this.cartService.deleteItemFromCart(id)
    .subscribe(dish => {
      this.updatedDish = dish;
      this.empty = this.isEmpty(this.cart);
      // console.log("Item removed from the cart.");
      this.openSnackBar("Item removed from the cart", "close")
      // this.findTotalCost();
     this.ngOnInit();
      
    });
  }
  isEmpty(obj: dish[]) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key)){
        return false;
      }
    }
    return true;
  }

  inputQuant(input: number, id: string) {
    // console.log(input, id);
    if (Math.floor(input) > 0) {
      input = Math.floor(input);
      // this.dishService.getDish(id).subscribe(dish => {
      // this.updatedDish = dish;
      // this.updatedDish['quantity'] = input;
      // console.log(this.updatedDish)
      this.cartService.updateQuantity( { _id : id, quantity : input } ).subscribe(
        dish => {
          this.updatedDish = dish;
          console.log('updated dish: ',this.updatedDish)
          this.openSnackBar("Quantity updated successfully","close")
          // this.findTotalCost();
          this.empty = this.isEmpty(this.cart);
          this.ngOnInit();
        }, err =>  console.log(err)
        );
      // });
    }
    else if (Math.floor(input) == 0) {
      this.remove(id)
    }
    else {
      this.openSnackBar("Enter a positive integer", 'close');
      setTimeout(() => {
        // location.reload();
      this.ngOnInit();

      }, 2000);
    }
    
  }
  findTotalCost() {
    this.totalCost = 0;
    for(var item in this.cart) {
      // console.log(this.cart[item]);
      this.totalCost += this.cart[item].quantity * Number(this.cart[item].price);
      
    }
  }

}
