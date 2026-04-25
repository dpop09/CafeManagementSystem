import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Api } from '../services/api';

@Component({
  selector: 'app-navigation',
  imports: [CommonModule, RouterModule],
  templateUrl: './navigation.html',
  styleUrl: './navigation.css',
})
export class Navigation implements OnInit {
  isLoggedIn = false;

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.apiService.token$.subscribe(token => {
      this.isLoggedIn = !!token; // true if token exists, false if null
    })
  }

  onLogout() {
    this.apiService.logout();
  }
}
