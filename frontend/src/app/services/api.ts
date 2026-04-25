import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:8080/';

  // BehaviorSubject object will hold the current token value
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  // this observable is what other componenets will subscribe to
  token$ = this.tokenSubject.asObservable();

  setToken(token: string) {
    localStorage.setItem('token', token); // persist for page refreshes
    this.tokenSubject.next(token);        // notify all subscribers
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
  }

  constructor(private http: HttpClient) { }

  getServerResponse(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  signupUser(signupInfo: { username: string; contactNumber: string; email: string; password: string }): Observable<any> {
    return this.http.post(this.apiUrl + "user/signup", signupInfo);
  }

  loginUser(loginInfo: { email: string; password: string; }): Observable<any> {
    return this.http.post(this.apiUrl + "user/login", loginInfo);
  }
}
