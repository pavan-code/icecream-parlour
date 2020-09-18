import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { user } from '../shared/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: user): Observable<user> {
    return this.http.post<user>("http://localhost:3000/users/register", user);
  }

 login(user: user): Observable<user> {
   return this.http.post<user>("http://localhost:3000/users/login", user);
 }

 getUsers(): Observable<user[]> {
   return this.http.get<user[]>("http://localhost:3000/users")
 }
}
