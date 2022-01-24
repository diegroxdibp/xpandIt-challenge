import { Component, OnInit } from '@angular/core';
import { PillsStatusService } from '../pills-status.service';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss']
})
export class MovieRankingComponent implements OnInit {
  top10RevenueByYearSelectIsActive: boolean = false;
  constructor(
    public pillsService: PillsStatusService
  ) { }

  ngOnInit(): void { }

  yearSelect(): void {
    this.top10RevenueByYearSelectIsActive = !this.top10RevenueByYearSelectIsActive;
  }

  backdropAction() {
    this.top10RevenueByYearSelectIsActive = false;
  }
}
