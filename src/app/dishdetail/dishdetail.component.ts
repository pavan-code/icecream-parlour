import { Component, OnInit, Input } from '@angular/core';
import { dish } from '../shared/dish';
import { comment } from '../shared/comment';
import { DishserviceService } from '../services/dishservice.service';
import { CartService } from '../services/cart.service';
import { ActivatedRoute, Params } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


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

  constructor(private dishService: DishserviceService,
              private cartService: CartService,
              private route: ActivatedRoute,
              private location: Location,
              private fb: FormBuilder) { }

  ngOnInit(): void {
    this.dishService.getDishIds().subscribe(dishIds => this.dishIds = dishIds)
    // let id = this.route.snapshot.params['id']
    // this.dishService.getDish(id)
    // .subscribe(dish => {
    //   this.dish= dish;
    //   this.setPrevNext(dish.id);
    // });
    this.createForm();
    let id = this.route.params
     .pipe(switchMap((params : Params) => {  return this.dishService.getDish(params['id']); }))
     .subscribe(dish => {
       this.dish = dish;
       this.dishCopy = dish;
       this.setPrevNext(dish.id);
      
      });
  }
  setPrevNext(id: string) {
    const index = this.dishIds.indexOf(id);
    this.prev = this.dishIds[(this.dishIds.length+index-1)% this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length+index+1)% this.dishIds.length]
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
      })
      this.commentForm.reset({
        author: '',
        rating: 5,
        comment: ''
      })
  }

  addToCart(dishId: string) {
    // console.log(dishId); 
    
    this.dishService.getDish(dishId)
    .subscribe(cartDish => {
      this.cartDish = cartDish;
      console.log(this.cartDish);
      this.cartService.addCart(this.cartDish).subscribe(cartDish => this.cartDish = cartDish);
      })
    }
    
    // console.log(this.cartDish);
    // let id = this.route.params
    //  .pipe(switchMap((params : Params) => {  return this.dishService.getDish(params['id']); }))
    //  .subscribe(dish => {
    //    this.cartDish = dish;               
    //   });
    //   console.log(this.cartDish);

}