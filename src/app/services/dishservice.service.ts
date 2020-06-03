import { Injectable } from '@angular/core';
import { dishes } from '../shared/dishes';
import { dish } from '../shared/dish'
import { Observable } from 'rxjs';
import { HttpClient, } from '@angular/common/http'
import { map, catchError} from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class DishserviceService {

  constructor(private http: HttpClient) { }

    getDishes(): Observable<dish[]> {
      return this.http.get<dish[]>("http://localhost:3000/" + 'dishes');
    }
    getDish(id: string): Observable<dish> {
      return this.http.get<dish>("http://localhost:3000/dishes/" + id);
    }
    getDishIds(): Observable<string[]> {
      return this.getDishes().pipe(map(dishes => dishes.map(dish => dish.id)))
    }
    putDish(dish: dish): Observable<dish> {
      return this.http.put<dish>("http://localhost:3000/dishes/"+ dish.id, dish);
    }
}
