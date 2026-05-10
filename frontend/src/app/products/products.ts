import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  addProductForm = new FormGroup({
    categoryId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
  })
  updateProductForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required])
  })
  updateProductStatusForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  })

  patchProduct(product: any) {
    this.updateProductForm.patchValue({
      id: product.id,
      categoryId: product.categoryId,
      name: product.name,
      description: product.description,
      price: product.price
    });
    // Also patch the status form in case they want to toggle it
    this.updateProductStatusForm.patchValue({
      id: product.id,
      status: product.status
    });
  }

  constructor(private apiService: Api) { }

  productsData = signal<any>([]);
  formMode = signal<string>('');

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

  onAddProduct() {
    if (this.addProductForm.valid) {
      this.apiService.addProduct(this.addProductForm.value as any).subscribe({
        next: (response) => {
          console.log(response);
          this.GetProducts();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onUpdateProduct() {
    if (this.updateProductForm.valid) {
      this.apiService.updateProduct(this.updateProductForm.value as any).subscribe({
        next: (response) => {
          console.log(response);
          this.GetProducts();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onUpdateProductStatus() {
    if (this.updateProductStatusForm.valid) {
      this.apiService.updateProductStatus(this.updateProductStatusForm.value as any).subscribe({
        next: (response) => {
          console.log(response);
          this.GetProducts();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
