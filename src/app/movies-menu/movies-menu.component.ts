import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { slideY } from '../animations';
import { Movie } from '../models/movie';
import { MoviesMenuService } from '../movies-menu.service';

@Component({
  selector: 'movies-menu',
  templateUrl: './movies-menu.component.html',
  styleUrls: ['./movies-menu.component.scss'],
  animations: [...slideY]
})
export class MoviesMenuComponent {

  movieSearch$: Observable<Movie[]>;

  constructor(
    public moviesMenuService: MoviesMenuService
  ) { }

  updateSearchTerm($event: KeyboardEvent): void {
    const searchTerm = ($event.target as HTMLInputElement).value;
    this.moviesMenuService.updateSearchTerm(searchTerm);
  }

}
