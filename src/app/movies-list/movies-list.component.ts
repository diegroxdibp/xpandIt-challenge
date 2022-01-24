import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AfterViewInit, Component, Input, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { filter, finalize, map, pairwise, throttleTime } from 'rxjs/operators';

import { Movie } from '../models/movie';
import { MovieDeatilComponent } from '../movie-deatil/movie-deatil.component';
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
    public dialog: MatDialog
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

  // Dialog dimensions
  // Height = Screen height - Navbar size - Top and Bottom margins on design document together
  // Position, Starting from the top and offseting navbar and top margin = Navabar size + Top margin on document
  openDialog(movie: Movie): void {
    const dialogRef = this.dialog.open(MovieDeatilComponent, {
      maxHeight: 'calc(100vh - 50px - 42px)',
      width: '750px',
      ariaLabel: 'Movie information',
      panelClass: 'dialog-box-movie-details',
      position: {
        top: '71px'
      },
      data: movie,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
