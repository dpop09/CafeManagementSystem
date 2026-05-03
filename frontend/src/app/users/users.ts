import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-users',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './users.html',
  styleUrl: './users.css',
})
export class Users implements OnInit {
  approveUserForm = new FormGroup({
    id: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required])
  })

  constructor(private apiService: Api) { }

  usersData = signal<any>([]);
  formMode = signal<any>('');

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

  onApproveUser() {
    if (this.approveUserForm.valid) {
      const formData = {
        ...this.approveUserForm.value,
        status: this.approveUserForm.value.status?.toLowerCase()
      };
      this.apiService.approveUser(formData as any).subscribe({
        next: (response) => {
          console.log(response)
          this.GetUsers();
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }
}
