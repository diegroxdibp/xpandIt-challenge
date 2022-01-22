import { Movie } from "./movie";

interface Sort {
  empty: boolean,
  sorted: boolean,
  unsorted: boolean,
}

interface Pageable {
  offset: number,
  pageNumber: number,
  numberOfElements: number,
  paged: boolean,
  sort: Sort
}

export interface MoviesApiResponse {
  content: Movie[],
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  numberOfElements: number,
  pageable: Pageable,
  size: number,
  sort: Sort,
  totalElements: number,
  totalPages: number,
}
