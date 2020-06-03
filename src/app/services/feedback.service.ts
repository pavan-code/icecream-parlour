import { Injectable } from '@angular/core';
import { feedback } from '../shared/feedback';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FeedbackService {

  constructor(private http: HttpClient) { }
  submitFeedback(feedback: feedback): Observable<feedback> {
    return this.http.post<feedback>("http://localhost:3000/feedback", feedback);
  }

}
