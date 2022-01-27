import { Component } from '@angular/core';

import { slideX } from '../animations';
import { MoviesMenuService } from '../movies-menu.service';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss'],
  animations: [...slideX]
})

export class MovieRankingComponent {

  constructor(
    public moviesMenuService: MoviesMenuService
  ) { }
}
