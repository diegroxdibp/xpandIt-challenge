export interface Movie {
  id: string,
  rank: number,
  revenue: number,
  title: string,
  year: number
}
export interface MovieFullDescription {
  id: string,
  rank: number,
  revenue: number,
  title: string,
  year: number
  genre: string,
  description: string,
  director: string,
  actors: string,
  runtime: number,
  rating: number,
  votes: number,
  metascore: number
}

