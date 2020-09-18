import { Component, OnInit, Input } from '@angular/core';
import { dish } from '../shared/dish';
import { comment } from '../shared/comment';
import { DishserviceService } from '../services/dishservice.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar'
import { HttpmsgService } from '../services/httpmsg.service';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.css']
})
export class DishdetailComponent implements OnInit {

  
  dish: dish;
  comment: comment;
  dishCopy: dish;
  dishIds: string[];
  commentForm: FormGroup;
  prev: string;
  next: string;
  commentErrors = {
    'author' : '',
    'comment': ''
  }
  validationMessages = {
    'author' : {
      'required': 'Author Name is required',
      'minlength': 'Author Name must be at least 2 characters long'
    },
    'comment': {
      'required': 'Comment is required'
    }
  }
  cartDish: dish;
  errMsg: any;

  constructor(private dishService: DishserviceService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private httpMsgService: HttpmsgService) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds)
    this.createForm();
    let id = this.route.params
     .pipe(switchMap((params : Params) => {  return this.dishService.getDish(params['id']); }))
     .subscribe(dish => {
      //  console.log(dish._id);
      //  console.log(dish);
       this.dish = dish;
       this.dishCopy = dish;
       this.setPrevNext(dish._id);
      
      },
      error => {
        this.dish = null;
        this.dishCopy = null;
        this.errMsg = error;
      }
      );
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    })
  }
  setPrevNext(id: string) {
    const index = this.dishIds.indexOf(id);
    this.prev = this.dishIds[(this.dishIds.length+index-1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1)% this.dishIds.length]
    // console.log(this.prev, this.next)
  }
  goBack(): void {
    this.location.back();
  }
  createForm() {
    this.commentForm = this.fb.group({
        author : ['', [Validators.required, Validators.minLength(2)]],
        rating : [5],
        comment : ['', [Validators.required]]
    })
    this.commentForm.valueChanges.subscribe(data => this.onValueChanged(data));
  }
  onValueChanged(data?: any) {
    if (!this.commentForm) { return; } 
    const form = this.commentForm;
    for (const field in this.commentErrors) {
      if (this.commentErrors.hasOwnProperty(field)) {
        // clear previuos error messages if any
        this.commentErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.commentErrors[field] += messages[key];
            }
          }
        }
      }
    }
  }
  submit() {
    this.comment = this.commentForm.value;
    this.comment.date = new Date().toISOString();
    this.dish.comments.push(this.comment);
    this.dishService.putDish(this.dish)
    .subscribe(dish => {
      this.dish = dish;
      this.dishCopy = dish;
      // console.log("Comment posted successfully");
      this.openSnackBar("Comment posted successfully", "close")
      },
      error => {
        this.dishCopy = null;
        this.dish = null;
        this.errMsg = error;
      })
      this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
      })
  }

  addToCart(dishId: string) {
    // this.cartService.addCart(dishId)
    this.dishService.getDish(dishId)
    .subscribe(cartDish => {
      this.cartDish = cartDish;
      this.cartDish['quantity']=1;
      this.cartService.addCart(this.cartDish)
      .subscribe(cartDish => {
         this.cartDish = cartDish;
         this.openSnackBar("Item added to the cart successfully", "close")        
        }, error => {
          this.errMsg = error;
          this.openSnackBar("Item is already in the cart","close");
        });
      })
    }

    // $(function() {
    //   $( "i" ).click(function() {
    //     $( "i,span" ).toggleClass( "press", 1000 );
    //   });
    // });
    classApplied=false;
    like() {
      this.classApplied = !this.classApplied;
    }
}