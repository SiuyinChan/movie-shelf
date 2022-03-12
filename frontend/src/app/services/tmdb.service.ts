import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from "../../environments/environment";
import { Category, Movie, MovieDetails, PaginateResult } from "../models";

@Injectable({
  providedIn: 'root'
})
export class TmdbService {
  private baseUrl = environment.TMDB_BASE_URL;
  private apiKey = environment.TMDB_API_KEY;

  constructor(private http: HttpClient) {
  }

  public getMovieGenres(): Observable<Category[]> {
    return this.http.get<any>(`${this.baseUrl}/genre/movie/list`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(map((data) => data.genres));
  }

  public getPopularMovies(page: number = 1): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/movie/popular`, {
      params: {
        api_key: this.apiKey,
        page
      }
    })
  };

  public getTopRatedMovies(page: number = 1): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/movie/top_rated`, {
      params: {
        api_key: this.apiKey,
        page
      }
    })
  };

  public getUpcomingMovies(page: number = 1): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/movie/upcoming`, {
      params: {
        api_key: this.apiKey,
        page
      }
    })
  };

  public getMoviesByGenre(genre: number, sortBy: string = 'popularity.desc', page: number = 1): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/discover/movie`, {
      params: {
        api_key: this.apiKey,
        page,
        with_genres: genre,
        sort_by: sortBy
      }
    })
  };

  public getMovieById(id: number): Observable<MovieDetails> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        append_to_response: 'videos'
      }
    })
  }
}
