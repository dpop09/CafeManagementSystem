import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:8080/';

  constructor(private http: HttpClient) { }

  getServerResponse(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  // fetchUsers(): Observable<any> {
  //   return this.http.get<any[]>(this.apiUrl+"user/get");
  // }

  // login(credentials: { email: string; password: string }): Observable<AuthResponse> {
  //   return this.http.post<AuthResponse>(this.apiUrl + "user/login", credentials);
  // }
}
