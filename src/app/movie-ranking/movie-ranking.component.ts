import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { slideX, slideY } from '../animations';
import { Movie } from '../models/movie';

import { MoviesService } from '../movies.service';
import { PillsStatusService } from '../pills-status.service';
@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss'],
  animations: [...slideX, ...slideY]
})

export class MovieRankingComponent implements OnInit, OnDestroy {
  top10RevenueByYearSelectIsActive: boolean = false;
  moviesYears$: Observable<number[]>;
  selectedYear: number;
  searchTextChanged = new Subject<string>();
  movieSearch$: Observable<Movie[]>;
  searchMode: boolean = false;

  constructor(
    private moviesService: MoviesService,
    public pillsService: PillsStatusService
  ) { }

  ngOnInit(): void {
    this.moviesYears$ = this.moviesService.getMoviesYears();
    this.searchTextChanged.pipe(
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((searchTerm: string) => {
      console.log(searchTerm);
      this.movieSearch$ = this.moviesService.searchMovie(searchTerm);
      this.movieSearch$.pipe(tap(res => console.log(res))).subscribe()
    });
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

  toggleSearchMode() {
    if (this.pillsService.top10RevenueActive) this.pillsService.toggleTop10RevenueStatus();
    if (this.pillsService.top10RevenueByYearActive) this.pillsService.toggleTop10RevenueByYearStatus();
    this.searchMode = !this.searchMode;
  }

  searchMovie($event: KeyboardEvent): void {
    const searchTerm = ($event.target as HTMLInputElement).value;
    this.searchTextChanged.next(searchTerm);
  }

  ngOnDestroy(): void {
    this.searchTextChanged.unsubscribe();
  }
}
