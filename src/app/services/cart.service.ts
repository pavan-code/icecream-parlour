import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  addCart(dish: dish): Observable<dish> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-type': 'application/json'
      })
    };
    return this.http.post<dish>("http://localhost:3000/cart",dish, httpOptions);
  }
  getCartItems(): Observable<dish[]> {
    return this.http.get<dish[]>("http://localhost:3000/cart");
  }
}
