import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PillsStatusService {
  top10RevenueActive: boolean = false;
  top10RevenueByYearActive: boolean = false;
  constructor() { }

  toggleTop10RevenueStatus(): void {
    this.top10RevenueByYearActive = false;
    this.top10RevenueActive = !this.top10RevenueActive;

  }

  toggleTop10RevenueByYearStatus(): void {
    this.top10RevenueActive = false;
    this.top10RevenueByYearActive = !this.top10RevenueByYearActive;
  }
}
