import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

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

  errorMessage = signal<string>('');

  constructor(
    private apiService: Api, 
    private router: Router
  ) {}

  ngOnInit() {}

  onLogin() {
    this.errorMessage.set('');
    if (this.loginForm.valid) {
      this.apiService.loginUser(this.loginForm.value as any).subscribe({
        next: (response) => {
          console.log('Success', response);
          this.apiService.setToken(response.token);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          this.errorMessage.set(err.error.message);
          console.log('Error', this.errorMessage);
        }
      })
    }
  }
}
