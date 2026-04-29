import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './signup.html',
  styleUrl: './signup.css',
})
export class Signup implements OnInit {
  signupForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    contactNumber: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })
  
  responseMessage = signal<string>('');

  constructor(private apiService: Api) {}

  ngOnInit() {}

  onSignup() {
    this.responseMessage.set('');
    if (this.signupForm.valid) {
      this.apiService.signupUser(this.signupForm.value as any).subscribe({
        next: (response) => {
          console.log('Success', response);
          this.responseMessage.set(response.message);
        },
        error: (err) => {
          console.error('Error', err);
          this.responseMessage.set(err.error.message);
        }
      })
    }
  }
}
