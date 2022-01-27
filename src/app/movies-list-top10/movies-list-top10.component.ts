import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { DialogService } from '../dialog.service';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list-top10',
  templateUrl: './movies-list-top10.component.html',
  styleUrls: ['./movies-list-top10.component.scss']
})
export class MoviesListTop10Component implements OnInit, OnDestroy {

  movies: Movie[];
  movies$: Observable<Movie[]>;
  subscription: Subscription;
  loading = false;
  pageSize: number;

  constructor(
    private moviesService: MoviesService,
    public dialogService: DialogService
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.movies$ = this.moviesService.getTop10MoviesByRevenue()
      .pipe(
        finalize(() => { this.loading = false; })
      );
  }

  openDialog(movie: Movie): void {
    this.dialogService.openDialog(movie);
  }

  ngOnDestroy(): void {
  }
}
