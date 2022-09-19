import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesMenuService {
  searchTermMonitor = new Subject<string>();
  searchTerm: string | undefined;
  searchMenu: boolean = false;
  top10RevenueActive: boolean = false;
  top10RevenueByYearActive: boolean = false;
  top10RevenueByYearSelection: boolean = false;
  selectedYear: number;

  constructor() { }

  toggleTop10RevenueStatus(): void {
    this.top10RevenueByYearActive = false;
    this.searchMenu = false;
    this.top10RevenueActive = !this.top10RevenueActive;
  }

  toggleTop10RevenueByYearStatus(): void {
    this.top10RevenueActive = false;
    this.searchMenu = false;
    this.top10RevenueByYearActive = !this.top10RevenueByYearActive;
  }

  toggleYearSelection(): void {
    this.top10RevenueByYearSelection = !this.top10RevenueByYearSelection;
  }

  toggleSearchMode() {
    if (this.top10RevenueActive) this.toggleTop10RevenueStatus();
    if (this.top10RevenueByYearActive) this.toggleTop10RevenueByYearStatus();
    this.searchMenu = !this.searchMenu;
  }

  toggleSearchMenu(): void {
    this.top10RevenueActive = false;
    this.top10RevenueByYearActive = false;
    this.searchMenu = !this.searchMenu;
  }

  updateSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.searchTermMonitor.next(searchTerm);
  }
}
