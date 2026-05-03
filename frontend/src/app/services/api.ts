import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class Api {
  private apiUrl = 'http://localhost:8080/';

  // BehaviorSubject object will hold the current token value
  private tokenSubject = new BehaviorSubject<string | null>(localStorage.getItem('token'));
  private roleSubject = new BehaviorSubject<string | null>(this.getRoleFromToken(localStorage.getItem('token')));
  // this observable is what other componenets will subscribe to
  token$ = this.tokenSubject.asObservable();
  role$ = this.roleSubject.asObservable();

  setToken(token: string) {
    localStorage.setItem('token', token); // persist for page refreshes
    this.tokenSubject.next(token);        // notify all subscribers

    const role = this.getRoleFromToken(token);
    this.roleSubject.next(role);
  }

  setRole(role: string) {
    localStorage.setItem('role', role);
    this.roleSubject.next(role);
  }

  logout() {
    localStorage.removeItem('token');
    this.tokenSubject.next(null);
    this.roleSubject.next(null);
  }

  constructor(private http: HttpClient) { }

  getServerResponse(): Observable<any> {
    return this.http.get(this.apiUrl, { responseType: 'text' });
  }

  signupUser(signupInfo: { username: string; contactNumber: string; email: string; password: string; }): Observable<any> {
    return this.http.post(this.apiUrl + "user/signup", signupInfo);
  }

  loginUser(loginInfo: { email: string; password: string; }): Observable<any> {
    return this.http.post(this.apiUrl + "user/login", loginInfo);
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl + "user/get");
  }

  getCategories(): Observable<any> {
    return this.http.get(this.apiUrl + "category/get");
  }

  getProducts(): Observable<any> {
    return this.http.get(this.apiUrl + "product/get");
  }

  getBills(): Observable<any> {
    return this.http.get(this.apiUrl + "bill/getBills");
  }

  approveUser(userInfo: { id: string; status: string; }): Observable<any> {
    return this.http.patch(this.apiUrl + "user/update", userInfo);
  }

  addCategory(categoryInfo: { name: string; }): Observable<any> {
    return this.http.post(this.apiUrl + "category/add", categoryInfo);
  }

  updateCategory(categoryInfo: { id: string; name: string; }): Observable<any> {
    return this.http.patch(this.apiUrl + "category/update", categoryInfo);
  }

  addProduct(productInfo: { categoryId: string; name: string; description: string; price: string; }): Observable<any> {
    return this.http.post(this.apiUrl + "product/add", productInfo);
  }

  updateProduct(productInfo: { id: string; categoryId: string; name: string; description: string; price: string; }): Observable<any> {
    return this.http.patch(this.apiUrl + "product/update", productInfo);
  }

  updateProductStatus(productInfo: { id: string; status: string; }): Observable<any> {
    return this.http.patch(this.apiUrl + "product/updateStatus", productInfo);
  }

  private getRoleFromToken(token: string | null): string | null {
    if (!token)
      return null;
    try {
      const decoded: any = jwtDecode(token);
      return decoded.role;
    } catch (error) {
      return null;
    }
  }
}
