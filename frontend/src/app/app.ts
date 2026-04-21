import { CommonModule } from '@angular/common';
import { Component, signal, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Api } from './services/api';
import { Home } from './home/home';
import { Navigation } from './navigation/navigation';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, Navigation],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('frontend');
  
  serverMessage: string = 'Connecting to server...';

  constructor(private apiService: Api) {}

  ngOnInit() {
    this.apiService.getServerResponse().subscribe({
      next: (data) => {
        this.serverMessage = data;
        //console.log(this.serverMessage)
      },
      error: (err) => {
        this.serverMessage = 'Error: Could not reach the server.';
        console.error(err);
      }
    });
  }
  
}
