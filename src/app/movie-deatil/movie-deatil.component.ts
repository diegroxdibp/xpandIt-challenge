import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { Movie, MovieFullDescription } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-deatil',
  templateUrl: './movie-deatil.component.html',
  styleUrls: ['./movie-deatil.component.scss']
})
export class MovieDeatilComponent implements OnInit, OnDestroy {

  movie: MovieFullDescription;
  movie$: Observable<MovieFullDescription>;
  subscription: Subscription;

  constructor(
    public dialogRef: MatDialogRef<MovieDeatilComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Movie,
    private moviesService: MoviesService
  ) { }

  ngOnInit(): void {
    this.movie$ = this.moviesService.getMoviesById(this.data.id);
    this.subscription = this.movie$.subscribe((data: MovieFullDescription) => { this.movie = data })
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
