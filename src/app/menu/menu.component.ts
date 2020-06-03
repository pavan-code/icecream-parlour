import { Component, OnInit } from '@angular/core';
import { dish } from '../shared/dish'
import { DishserviceService } from '../services/dishservice.service';
// import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  selectedDish: dish;
  breakpoint: number;
  cartDish: dish;

  constructor(private dishService: DishserviceService) { }

  DISHES: dish[];
  // errMsg : string;
  ngOnInit(): void {
    this.breakpoint = (window.innerWidth <= 425 ) ? 1:2;
    this.dishService.getDishes()
    .subscribe(
      dishes => {
        this.DISHES = dishes;
      }
    ) 
  }
  onResize(event) {
    this.breakpoint = (event.target.innerWidth <= 425) ? 1 : 2;
  }

  onSelect(dish: dish) {
    this.selectedDish = dish;
  }
}
