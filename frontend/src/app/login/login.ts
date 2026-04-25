import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Api } from '../services/api';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit{ 
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  responseMessage: string = '';

  constructor(private apiService: Api) {}

  ngOnInit() {}

  onLogin() {
    console.log(this.loginForm.value)
    if (this.loginForm.valid) {
      this.apiService.loginUser(this.loginForm.value as any).subscribe({
        next: (response) => {
          console.log('Success', response);
          this.apiService.setToken(response.token);
          this.responseMessage = 'User logged in successfully.';
        },
        error: (err) => {
          console.log('Error', err);
          this.responseMessage = 'Error logging in. Please try again later.';
        }
      })
    }
  }
}
