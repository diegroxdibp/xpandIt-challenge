import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged, finalize, tap } from 'rxjs/operators';

import { Movie, MovieFullDescription } from '../models/movie';
import { MovieDetailComponent } from '../movie-deatil/movie-detail.component';
import { MoviesMenuService } from '../movies-menu.service';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'movies-search',
  templateUrl: './movies-search.component.html',
  styleUrls: ['./movies-search.component.scss']
})
export class MoviesSearchComponent implements OnDestroy {
  loading: boolean;
  moviesFound: Movie[];
  subscription: Subscription;

  constructor(
    private moviesService: MoviesService,
    private moviesMenuService: MoviesMenuService,
    private dialog: MatDialog,
  ) {
    this.subscription = this.moviesMenuService.searchTermMonitor.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.loading = true)
    ).subscribe((searchTerm: string) => {
      this.moviesService.searchMovie(searchTerm).pipe(
        finalize(() => this.loading = false)
      ).subscribe((movies: Movie[]) => {
        this.moviesFound = movies.sort(function (a, b) {
          if (a.title < b.title) { return -1; }
          if (a.title > b.title) { return 1; }
          return 0;
        })
      })
    })
  }

  // Dialog dimensions
  // Height = Screen height - Navbar size - Top and Bottom margins on design document together
  // Position, Starting from the top and offseting navbar and top margin = Navabar size + Top margin on document
  openDialog(movie: Movie): void {
    const movieDetail$ = this.moviesService.getMoviesById(movie.id);
    const movieDetailSubscription = movieDetail$.subscribe((movie: MovieFullDescription) => {
      const dialogRef = this.dialog.open(MovieDetailComponent, {
        maxHeight: 'calc(100vh - 50px - 42px)',
        width: '750px',
        ariaLabel: 'Movie information',
        panelClass: 'dialog-box-movie-details',
        position: {
          top: '71px'
        },
        data: movie,
      });

      dialogRef.afterClosed().subscribe(() => {
        movieDetailSubscription.unsubscribe()
      });
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
