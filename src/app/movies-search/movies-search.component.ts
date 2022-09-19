import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, switchMap, tap } from 'rxjs/operators';

import { DialogService } from '../dialog.service';
import { Movie } from '../models/movie';
import { MoviesMenuService } from '../movies-menu.service';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnDestroy {
  moviesFound: Movie[];
  loading: boolean = false;
  subscription: Subscription;

  constructor(
    private moviesService: MoviesService,
    private moviesMenuService: MoviesMenuService,
    private dialogService: DialogService,
  ) {
    this.subscription = this.moviesMenuService.searchTermMonitor.pipe(
      // Wait 500ms for text so it won't flood requests on every keystroke
      debounceTime(500),
      // Only request if new value
      distinctUntilChanged(),
      tap((searchTerm: string) => { this.loading = true; console.log(searchTerm); }),
      switchMap((searchTerm: string)=> {
        return this.moviesService.searchMovie(searchTerm).pipe(
          finalize(() => this.loading = false)
        );
      })
    ).subscribe((movies: Movie[]) => {
        this.moviesFound = movies.sort(function (a, b) {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        })
      })
  }

  openDialog(movie: Movie): void {
    this.dialogService.openDialog(movie);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
