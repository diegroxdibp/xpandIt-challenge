import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie, MovieFullDescription } from './models/movie';
import { MoviesApiResponse } from './models/moviesApiResponse';
import { map, tap } from 'rxjs/operators';

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

  getMoviesByPage(pageSize: number = this.pageSize, pageNumber: number = this.currentPage, yearStart?: number): Observable<Movie[]> {
    const size = `size=${pageSize}`;
    const page = `page=${pageNumber}`;
    const year = `${yearStart ? 'page=' + yearStart : ''}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page])} `
    ).pipe(
      tap({
        next: (response: MoviesApiResponse) => {
          this.currentPageIsLast = response.last;
          this.currentPage = response.pageable.pageNumber;
          console.log('Page --> ', this.currentPage)
          console.log(this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page, year]));
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
    return `${url}${endpoint}${queryParamsString} `
  }


  getMoviesByPageTop10(pageSize: number = 10, pageNumber: number = this.currentPage, yearStart?: number): Observable<Movie[]> {
    const size = `size=${pageSize}`;
    const page = `page=${pageNumber}`;
    const year = `${yearStart ? 'page=' + yearStart : ''}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page])} `
    ).pipe(
      tap({
        next: (response: any) => {
          this.currentPageIsLast = response.last;
          this.currentPage = response.pageable.pageNumber;
          console.log(this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page, year]));
        },
      }),
      map((response: MoviesApiResponse) => {
        const sortedByRevenue = response.content.sort((a, b) => (a.revenue < b.revenue) ? 1 : -1);
        return sortedByRevenue;
      })
    );
  }
}
