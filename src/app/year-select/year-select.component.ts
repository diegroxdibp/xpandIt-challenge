import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { DialogService } from '../dialog.service';
import { MoviesMenuService } from '../movies-menu.service';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss']
})
export class YearSelectComponent {
  moviesYears$: Observable<number[]>;

  constructor(
    private moviesService: MoviesService,
    public moviesMenuService: MoviesMenuService,
    public dialogService: DialogService
  ) {
    this.moviesYears$ = this.moviesService.getMoviesYears();
  }

  selectYear(year: number): void {
    if (!this.moviesMenuService.top10RevenueByYearActive) this.moviesMenuService.toggleTop10RevenueByYearStatus();
    this.moviesMenuService.selectedYear = year;
    this.dialogService.closeYearSelectionMenu()
  }

  backdropAction() {
    this.dialogService.closeYearSelectionMenu();
  }
}
