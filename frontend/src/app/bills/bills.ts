import { CommonModule } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import { Api } from '../services/api';

@Component({
  selector: 'app-bills',
  imports: [CommonModule],
  templateUrl: './bills.html',
  styleUrl: './bills.css',
})
export class Bills implements OnInit {
  constructor(private apiService: Api) {}

  billsData = signal<any>([]);

  ngOnInit() {
    this.GetBills();
  }

  GetBills() {
    this.apiService.getBills().subscribe({
      next: (response) => {
        this.billsData.set(response);
        console.log(this.billsData());
      },
      error: (err) => {
        console.log(err);
      }
    })
  }
}
