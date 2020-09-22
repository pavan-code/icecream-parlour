import { Injectable } from '@angular/core';
import { dish } from '../shared/dish';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpmsgService } from './httpmsg.service';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient, private processHTTPMsg: HttpmsgService) { }

  addCart(dishId: string): Observable<dish> {
    // const httpOptions = {
    //   headers: new HttpHeaders({
    //     'Content-type': 'application/json'
    //   })
    // };
    return this.http.post<dish>("http://localhost:3000/cart",  {dishId} )
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
  getCartItems(): Observable<dish[]> {
    return this.http.get<dish[]>("http://localhost:3000/cart")
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
  updateQuantity(dish: any): Observable<dish> {
    // console.log('dish: ',dish);
    
    return this.http.put<dish>("http://localhost:3000/cart/" + dish._id, dish)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
  deleteItemFromCart(id: string) : Observable<dish> {
    return this.http.delete<dish>("http://localhost:3000/cart/"+id)
    .pipe(catchError(this.processHTTPMsg.handleError));
  }
  
}
