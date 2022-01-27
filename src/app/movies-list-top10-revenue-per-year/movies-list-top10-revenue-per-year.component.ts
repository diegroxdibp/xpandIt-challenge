import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DialogService } from '../dialog.service';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list-top10-revenue-per-year',
  templateUrl: './movies-list-top10-revenue-per-year.component.html',
  styleUrls: ['./movies-list-top10-revenue-per-year.component.scss']
})
export class MoviesListTop10RevenuePerYearComponent implements OnInit, OnChanges, OnDestroy {
  @Input('year') year: number;
  movies: Movie[];
  subscription: Subscription;
  loading = false;

  constructor(
    private moviesService: MoviesService,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.moviesService.getTop10MoviesByRevenuePerYear(this.year)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe((movies: Movie[]) => this.movies = movies);
  }

  openDialog(movie: Movie): void {
    this.dialogService.openDialog(movie);
  }

  ngOnChanges(): void {
    console.log(this.year)
    this.loading = true;
    const newSubscription = this.moviesService.getTop10MoviesByRevenuePerYear(this.year)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe((movies: Movie[]) => this.movies = movies);
    this.subscription = newSubscription;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
