import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { slideX, slideY } from '../animations';
import { Movie } from '../models/movie';
import { MoviesMenuService } from '../movies-menu.service';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss'],
  animations: [...slideX, ...slideY]
})

export class MovieRankingComponent {
  movieSearch$: Observable<Movie[]>;

  constructor(
    public moviesMenuService: MoviesMenuService
  ) { }

  updateSearchTerm($event: KeyboardEvent): void {
    const searchTerm = ($event.target as HTMLInputElement).value;
    this.moviesMenuService.updateSearchTerm(searchTerm);
  }

}
