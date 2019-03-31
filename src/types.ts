export interface User {
  id: number;
  email: string;
}

export enum PreferenceType {
  positive = "positive",
  negative = "negative"
}

export interface MoviePreference {
  id: number;
  user_id: number;
  external_movie_id: string;
  title: string;
  preference_type: PreferenceType;
}

export interface Movie {
  externalMovieId: string;
  title: string;
}

export type SetMovies = (movies: Array<MoviePreference>) => void;
