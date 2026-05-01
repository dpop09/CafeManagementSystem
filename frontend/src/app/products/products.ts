import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-products',
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  constructor(private apiService: Api) {}

  productsData = signal<any>([]);

  ngOnInit() {
    this.GetProducts();
  }

  GetProducts() {
    this.apiService.getProducts().subscribe({
      next: (response) => {
        this.productsData.set(response);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
