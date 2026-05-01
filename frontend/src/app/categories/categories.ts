import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categories',
  imports: [CommonModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {

  constructor(private apiService: Api) { }

  categoriesData = signal<any>([]);

  ngOnInit() {
    this.GetCategories();
  }

  GetCategories() {
    this.apiService.getCategories().subscribe({
      next: (response) => {
        this.categoriesData.set(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
