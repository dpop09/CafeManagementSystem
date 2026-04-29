import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation implements OnInit {
  isLoggedIn = false;
  isAdmin = false;

  constructor(private apiService: Api, private router: Router) {}

  ngOnInit() {
    this.apiService.token$.subscribe(token => {
      this.isLoggedIn = !!token; // true if token exists, false if null
    })
    this.apiService.role$.subscribe(role => {
      this.isAdmin = (role === "admin");
    })
  }

  onLogout() {
    this.apiService.logout();
    this.router.navigate(['/home']);
  }
}
