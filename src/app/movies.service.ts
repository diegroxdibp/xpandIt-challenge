import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './models/movie';
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
    this.pageSize = 10;
  }

  getMoviesFullApiResponse(): Observable<MoviesApiResponse> {
    return this.http.get<MoviesApiResponse>(`${this.API_URL}${this.MOVIES_ENDPOINT}`);
  }

  getMovies(): Observable<Movie[]> {
    return this.getMoviesFullApiResponse().pipe(
      map((response: MoviesApiResponse) => { return response.content })
    );
  }

  getMoviesByPage(pageSize: number = this.pageSize, pageNumber: number = this.currentPage): Observable<Movie[]> {
    const size = `size=${pageSize}`;
    const page = `page=${pageNumber}`;
    return this.http.get<MoviesApiResponse>(
      `${this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [size, page])}`
    ).pipe(
      tap({
        next: (response: MoviesApiResponse) => {
          this.currentPage = response.pageable.pageNumber;
          this.currentPageIsLast = response.last;
          console.log('Page --> ', this.currentPage)
          console.log(this.queryBuilder(this.API_URL, this.MOVIES_ENDPOINT, [pageSize.toString(), pageNumber.toString()]));
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

}
