import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Movie, MovieFullDescription } from '../models/movie';
import { MovieDetailComponent } from '../movie-deatil/movie-detail.component';
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
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.moviesService.getMoviesByYear(this.year)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe((movies: Movie[]) => this.movies = movies);
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

  ngOnChanges(): void {
    console.log(this.year)
    this.loading = true;
    const newSubscription = this.moviesService.getMoviesByYear(this.year)
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
