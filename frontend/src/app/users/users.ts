import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [CommonModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {

  constructor(private apiService: Api) { }

  usersData = signal<any>([]);

  ngOnInit() {
    this.GetUsers();
  }

  GetUsers() {
    this.apiService.getUsers().subscribe({
      next: (response) => {
        this.usersData.set(response)
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
