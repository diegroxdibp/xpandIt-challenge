import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, NgZone, OnInit, ViewChild } from '@angular/core';
import { concat, merge, Observable } from 'rxjs';
import { filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movie-ranking',
  templateUrl: './movie-ranking.component.html',
  styleUrls: ['./movie-ranking.component.scss']
})
export class MovieRankingComponent implements OnInit, AfterViewInit {


  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  movies: Movie[];
  loading = false;
  pageSize: number;

  displayedColumns = ['rank', 'title', 'year', 'revenue', 'eye'];
  dataSource: Movie[];

  constructor(
    private moviesService: MoviesService,
    private ngZone: NgZone
  ) {
    this.moviesService.getMoviesByPage().subscribe(data => this.dataSource = data);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // this.scroller.elementScrolled().pipe(
    //   map(() => this.scroller.measureScrollOffset('bottom')),
    //   pairwise(),
    //   filter(([y1, y2]) => (y2 < y1 && y2 < 90)),
    //   throttleTime(200)
    // ).subscribe(() => {
    //   this.ngZone.run(() => {
    //     this.fetchNextPage();
    //   });
    // }
    // );
  }

  fetchNextPage(e: any) {
    console.log('proc', e)
    this.loading = true;
    this.moviesService.getMoviesByPage(this.moviesService.pageSize, this.moviesService.currentPage + 1)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe((data) => { this.dataSource = [...this.dataSource, ...data] });
  }
}
