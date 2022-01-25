import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieFullDescription } from './models/movie';
import { MoviesApiResponse } from './models/moviesApiResponse';
import { map, take, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MoviesService {

  API_URL = 'http://movie-challenge-api-xpand.azurewebsites.net/';
  MOVIES_ENDPOINT = 'api/movies';
  currentPage: number;
  currentPageIsLast: boolean;
  pageSize: number;

  constructor(private http: HttpClient) {
    // Defaulting values
    this.currentPage = 0;
    this.pageSize = 20;
  }

  getMoviesFullApiResponse(): Observable<MoviesApiResponse> {
    return this.http.get<MoviesApiResponse>(`${this.API_URL}${this.MOVIES_ENDPOINT}`);
  }

  getMovies(): Observable<Movie[]> {
    return this.getMoviesFullApiResponse().pipe(
      map((response: MoviesApiResponse) => { return response.content })
    );
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

  // Get years from movies and sort from latest to oldest
  getMoviesYears(): Observable<number[]> {
    return this.getMovies().pipe(
      map((movies: Movie[]) => {
        const years: number[] = [];
        const yearsArray = movies.map((movie: Movie) => { return movie.year });
        yearsArray.forEach((year: number) => { if (!years.includes(year)) { years.push(year) } })
        return years.sort().reverse();
      })
    )
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

  getMoviesByYear(yearStart: number, yearEnd?: number): Observable<Movie[]> {
    const start = `start=${yearStart}`;
    const finish = `${yearEnd ? 'end=' + yearEnd : 'end=' + yearStart}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [start, finish])} `
    ).pipe(
      tap({
        next: () => {
          console.log(this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [start, finish]));
        },
      }),
      map((response: MoviesApiResponse) => {
        return response.content.
          filter((movie: Movie, index: number) => index < 10).sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);
      })
    );
  }


  getTop10MoviesByRevenue(): Observable<Movie[]> {
    return this.getMovies().pipe(
      map((movies: Movie[]) => {
        const sortedByRevenue = movies.sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);
        return sortedByRevenue.filter((movie: Movie, index: number) => index < 10);
      }),
      tap({
        next: (movies: Movie[]) => {
          console.log(movies);
        },
      }),
    );
  }

  // getTop10RevenuePerYear(): Observable<Movie[]> {
  //   return this.getMoviesByYear.pipe(
  //     map((movies: Movie[]) => {
  //       return movies.sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);
  //     })
  //   )
  // }

}
