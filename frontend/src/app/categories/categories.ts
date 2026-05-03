import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-categories',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories.html',
  styleUrl: './categories.css',
})
export class Categories implements OnInit {
  addCategoryForm = new FormGroup({
    name: new FormControl('', [Validators.required])
  })
  updateCategoryForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required])
  })

  constructor(private apiService: Api) { }

  categoriesData = signal<any>([]);
  formMode = signal<string>('');

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

  onAddCategory() {
    if (this.addCategoryForm.valid) {
      this.apiService.addCategory(this.addCategoryForm.value as any).subscribe({
        next: (response) => {
          this.GetCategories();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  onUpdateCategory() {
    if (this.updateCategoryForm.valid) {
      this.apiService.updateCategory(this.updateCategoryForm.value as any).subscribe({
        next: (response) => {
          this.GetCategories();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

}
