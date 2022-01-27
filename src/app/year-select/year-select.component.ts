import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MoviesMenuService } from '../movies-menu.service';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'year-select',
  templateUrl: './year-select.component.html',
  styleUrls: ['./year-select.component.scss']
})
export class YearSelectComponent implements OnInit {
  moviesYears$: Observable<number[]>;

  constructor(
    private moviesService: MoviesService,
    public moviesMenuService: MoviesMenuService
  ) {
    this.moviesYears$ = this.moviesService.getMoviesYears();
  }

  ngOnInit(): void {
  }

  closeYearSelectionMenu(): void {
    this.moviesMenuService.toggleYearSelection();
  }

  selectYear(year: number): void {
    if (!this.moviesMenuService.top10RevenueByYearActive) this.moviesMenuService.toggleTop10RevenueByYearStatus();
    this.moviesMenuService.selectedYear = year;
    this.closeYearSelectionMenu()
  }

  backdropAction() {
    this.closeYearSelectionMenu();
  }

}
