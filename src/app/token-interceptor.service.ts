import { AuthService } from './services/auth.service';
import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private injector: Injector) { }

  intercept(req, next) {
    let token = localStorage.getItem('JWT_TOKEN')
    if(token) {
      const cloned = req.clone({
        headers : req.headers.set("Authorization", "Bearer "+token)
      });
      return next.handle(cloned);
    }
    else 
      return next.handle(req);
  }
}
