import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss']
})
export class MovieRankingComponent implements OnInit {

  top10 = false;

  constructor(

  ) { }

  ngOnInit(): void { }

  top10Revenue() {
    this.top10 = !this.top10;
  }
}
