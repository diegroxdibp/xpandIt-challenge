import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';

import { DialogService } from '../dialog.service';
import { Movie } from '../models/movie';
import { MoviesService } from '../movies.service';

@Component({
  selector: 'app-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit, AfterViewInit, OnDestroy {

  @Input() params: number[];
  @ViewChild('scroller') scroller: CdkVirtualScrollViewport;

  subscription: Subscription;
  movies: Movie[];
  loading = false;
  pageSize: number;

  constructor(
    private moviesService: MoviesService,
    private ngZone: NgZone,
    private dialogService: DialogService,
  ) { }

  ngOnInit(): void {
    this.loading = true;
    this.subscription = this.moviesService.getMoviesByPage(...this.params)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe(data => this.movies = data);
  }

  ngAfterViewInit(): void {
    this.scroller.elementScrolled().pipe(
      map(() => this.scroller.measureScrollOffset('bottom')),
      pairwise(),
      filter(([y1, y2]) => (y2 < y1 && y2 < 90)),
      throttleTime(200)
    ).subscribe(() => {
      this.ngZone.run(() => {
        this.fetchNextPage();
      });
    }
    );
  }

  fetchNextPage(): void {
    this.moviesService.getMoviesByPage(this.moviesService.pageSize, this.moviesService.currentPage + 1)
      .pipe(
        finalize(() => { this.loading = false; })
      )
      .subscribe((data) => { this.movies = [...this.movies, ...data] });
  }

  openDialog(movie: Movie): void {
    this.dialogService.openDialog(movie);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
