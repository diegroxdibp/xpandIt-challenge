import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-ranking-table',
  templateUrl: './movie-ranking-table.component.html',
  styleUrls: ['./movie-ranking-table.component.scss']
})
export class MovieRankingTableComponent implements OnInit {

  moviesList: any;

  constructor() { }

  ngOnInit(): void {
  }

  fetchMore() {
    const newItems: any[] = [];

    this.moviesList = [...this.moviesList, ...newItems];
  }

}
