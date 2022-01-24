import { Component, OnInit } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list-top10',
  templateUrl: './movies-list-top10.component.html',
  styleUrls: ['./movies-list-top10.component.scss']
})
export class MoviesListTop10Component implements OnInit {

  movies: Movie[];
  loading = false;
  pageSize: number;

  constructor(
    private moviesService: MoviesService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.moviesService.getMoviesByPageTop10()
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe(data => this.movies = data);
  }
}
