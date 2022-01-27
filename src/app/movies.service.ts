import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';

import { Movie, MovieFullDescription } from './models/movie';
import { MoviesApiResponse } from './models/moviesApiResponse';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private readonly API_URL = 'https://movie-challenge-api-xpand.azurewebsites.net/';
  private readonly MOVIES_ENDPOINT = 'api/movies';
  private readonly moviesFullResponse$: Observable<MoviesApiResponse>;
  public readonly movies$: Observable<Movie[]>;
  public currentPage: number;
  public currentPageIsLast: boolean;
  public pageSize: number;

  constructor(private readonly http: HttpClient) {
    this.moviesFullResponse$ = this.http.get<MoviesApiResponse>(`${this.API_URL}${this.MOVIES_ENDPOINT}`).pipe(
      shareReplay({ bufferSize: 1, refCount: false }));
    this.movies$ = this.moviesFullResponse$.pipe(
      map((response: MoviesApiResponse) => { return response.content })
    );
    // Defaulting values
    this.currentPage = 0;
    this.pageSize = 20;
  }

  getMoviesById(id: string): Observable<MovieFullDescription> {
    return this.http.get<MovieFullDescription>(`${this.API_URL}${this.MOVIES_ENDPOINT}/${id}`);
  }

  getMoviesByPage(pageSize: number = this.pageSize, pageNumber: number = this.currentPage): Observable<Movie[]> {
    const size = `size=${pageSize}`;
    const page = `page=${pageNumber}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page])} `
    ).pipe(
      tap({
        next: (response: MoviesApiResponse) => {
          this.currentPageIsLast = response.last;
          this.currentPage = response.pageable.pageNumber;
          console.log('Page --> ', this.currentPage)
          console.log(this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page]));
        },
      }),
      map((response: MoviesApiResponse) => { return response.content })
    );
  }

  queryBuilder(url: string, endpoint: string, params: string[]) {
    const queryParams = ['?'];
    params.forEach((param: string, index: number) => {
      queryParams.push(param);
      if (index !== params.length - 1) queryParams.push('&');
    })
    const queryParamsString = queryParams.join('');
    return `${url}${endpoint}${queryParamsString}`
  }

  getTop10MoviesByRevenue(): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies: Movie[]) => {
        return movies.sort().reverse().splice(0, 10);
      })
    );
  }

  // Get years from movies and sort from latest to oldest
  getMoviesYears(): Observable<number[]> {
    return this.movies$.pipe(
      map((movies: Movie[]) => {
        const years = new Set<number>();
        for (const movie of movies) {
          years.add(movie.year);
        }
        return [...years].sort().reverse();
      })
    )
  }

  getTop10MoviesByRevenuePerYear(yearStart: number, yearEnd?: number): Observable<Movie[]> {
    const start = `start=${yearStart}`;
    const finish = `${yearEnd ? 'end=' + yearEnd : 'end=' + yearStart}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [start, finish])}`
    ).pipe(
      shareReplay({ bufferSize: 1, refCount: false }),
      map((response: MoviesApiResponse) => {
        return response.content.
          filter((movie: Movie, index: number) => index < 10).sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);
      })
    );
  }

  searchMovie(movieName: string): Observable<Movie[]> {
    return this.movies$.pipe(
      map((movies: Movie[]) => {
        return movies.filter((movie: Movie) => movie.title.toLowerCase().includes(movieName.toLowerCase()));
      })
    )
  }
}
