import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { concat, merge, Observable } from 'rxjs';
import { filter, map, pairwise, throttleTime } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss']
})
export class MovieRankingComponent implements OnInit, AfterViewInit {


  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  movies$: Observable<Movie[]>;
  loading = false;
  pageSize: number;

  constructor(
    private moviesService: MoviesService,
    private ngZone: NgZone
  ) {
    this.movies$ = this.moviesService.getMoviesByPage(10, 0);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 140)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.fetchNextPage();
      });
    }
    );
  }

  fetchNextPage() {
    if (!this.moviesService.currentPageIsLast)
      this.movies$ =
        merge(this.movies$, this.moviesService.getMoviesByPage(this.moviesService.pageSize, this.moviesService.currentPage + 1));
  }
}
