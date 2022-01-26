import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { MoviesService } from '../movies.service';
import { PillsStatusService } from '../pills-status.service';
@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss'],
  animations: [
    trigger('animation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(-300px)' }),
        animate(
          '300ms 400ms ease-in',
          style({ opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
      transition(':leave', [
        animate(
          '300ms ease-in',
          style({ opacity: 0, transform: 'translateX(300px)' })
        ),
      ]),
    ]),
  ]
})
export class MovieRankingComponent implements OnInit {
  top10RevenueByYearSelectIsActive: boolean = false;
  moviesYears$: Observable<number[]>;
  selectedYear: number;

  constructor(
    private moviesService: MoviesService,
    public pillsService: PillsStatusService
  ) { }

  ngOnInit(): void {
    this.moviesYears$ = this.moviesService.getMoviesYears();
  }

  openYearSelection(): void {
    this.top10RevenueByYearSelectIsActive = !this.top10RevenueByYearSelectIsActive;
  }

  closeYearSelectionMenu(): void {
    this.top10RevenueByYearSelectIsActive = false;
  }

  selectYear(year: number): void {
    if (!this.pillsService.top10RevenueByYearActive) this.pillsService.toggleTop10RevenueByYearStatus();
    this.selectedYear = year;
    this.closeYearSelectionMenu()
  }

  backdropAction() {
    this.closeYearSelectionMenu();
  }
}
