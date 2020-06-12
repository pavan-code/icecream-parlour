import { Component, OnInit } from '@angular/core';
import { dish } from '../shared/dish'
import { DishserviceService } from '../services/dishservice.service';
// import { Observable } from 'rxjs/Observable'
import { expand,visibility, flyInOut } from '../app.animation'
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
  host: {
    '[@flyInOut]': 'true',
    'style': 'display:block'
  },
  animations: [
    expand(),
    visibility(),
    flyInOut()
  ]
})
export class MenuComponent implements OnInit {
  selectedDish: dish;
  breakpoint: number;
  cartDish: dish;
  // images : [
  //   "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT7L-TA-_EEAkIre_TiDMXE49dnOfVmsKubhx_3wVSinpNx0Gw5&usqp=CAU",
  //   "https://lh3.googleusercontent.com/mfx5LLIQurTd6NmXXPCyzLdRbGcGrOp_InONgWf7_djxuavGPX3ohTmP1KOklCyJOf3Gmo4=s125",
  //   "https://lh3.googleusercontent.com/qRc9W3hPrPfxCqff7uHuY5_oM1q21rWH0oOUW-QdiV1LWQAf5auzJU4hzPDMHp6dVDwI=s136",
  //   "https://lh3.googleusercontent.com/7vHsANUXk5S-9r6xjVPKkRzvkUMvcG0IipAEGU4i1Dry6Qp4IFaRr7OAA0Kmtu542wMYIUM=s117",
  //   "https://lh3.googleusercontent.com/enr1QikEU1aNp4GsddFLYbuxu_jQtoJ1xmOEwN8mByOY1bNwaur9B9VjHOhiVyQRWOd9qWM=s152",
  //   "https://lh3.googleusercontent.com/jYHGkIk7w1uQFyVFYTJ_LJSQ7n1iMpnMtJOTP3ROmBmq_aps1HNdz0vZSfsrnBmOqBHng6s=s152"
  // ]

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
