import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Movie, MovieFullDescription } from '../models/movie';
import { MovieDetailComponent } from '../movie-deatil/movie-detail.component';
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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.movies$ = this.moviesService.getTop10MoviesByRevenue()
      .pipe(
        finalize(() => { this.loading = false; })
      );
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

  ngOnDestroy(): void {
  }
}
