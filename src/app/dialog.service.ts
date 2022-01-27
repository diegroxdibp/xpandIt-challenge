import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Movie, MovieFullDescription } from './models/movie';
import { MovieDetailComponent } from './movie-deatil/movie-detail.component';
import { MoviesMenuService } from './movies-menu.service';
import { MoviesService } from './movies.service';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(
    private dialog: MatDialog,
    private moviesService: MoviesService,
    private moviesMenuService: MoviesMenuService
  ) { }


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

  closeYearSelectionMenu(): void {
    this.moviesMenuService.toggleYearSelection();
  }
}
