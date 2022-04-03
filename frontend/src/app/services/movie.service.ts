import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { environment } from "../../environments/environment";
import { Category, Movie, MovieDetails, PaginateResult, Section } from "../models";

@Injectable({
  providedIn: 'root'
})
export class MovieService {
  private baseUrl = environment.TMDB_BASE_URL;
  private apiKey = environment.TMDB_API_KEY;

  public movieSections: Section[] = [
    {
      id: 1,
      title: 'Discover',
      categories: [
        {
          icon: '/assets/icons/cupcake-icon.svg',
          name: 'Popular',
          id: 1,
        },
        {
          icon: '/assets/icons/ginger-man-icon.svg',
          name: 'Top Rated',
          id: 2,
        },
        {
          icon: '/assets/icons/frites-icon.svg',
          name: 'Upcoming',
          id: 3,
        },
      ],
    },
    {
      id: 2,
      title: 'Genres',
      categories: [],
    },
  ]

  constructor(private http: HttpClient) {
  }

  public getMovieGenres(): Observable<Category[]> {
    return this.http.get<any>(`${this.baseUrl}/genre/movie/list`, {
      params: {
        api_key: this.apiKey
      }
    }).pipe(map((data) => {
      this.movieSections[1].categories = data.genres;
      return this.movieSections[1].categories;
    }));
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

  // This method is a wrapper for the past 4 methods
  public getMoviesByCategory(category: string, sortBy: string = 'popularity.desc', page: number = 1): Observable<PaginateResult> {
    switch (category?.toLowerCase()){
      case 'popular':
        return this.getPopularMovies(page);
      case 'top rated':
        return this.getTopRatedMovies(page);
      case 'upcoming':
        return this.getUpcomingMovies(page);
      default:
        const genreId = this.movieSections[1].categories.find((c: Category) => c.name.toLowerCase() === category.toLowerCase())?.id;
        return genreId ? this.getMoviesByGenre(genreId, sortBy, page) : of({
          page: 1,
          results: [],
          total_pages: 0,
          total_results: 0
        });
    }
  }

  public getMovieById(id: number): Observable<MovieDetails> {
    return this.http.get<any>(`${this.baseUrl}/movie/${id}`, {
      params: {
        api_key: this.apiKey,
        append_to_response: 'videos'
      }
    })
  }

  public getMoviesByName(name: string, page: number = 1): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/search/movie`, {
      params: {
        api_key: this.apiKey,
        query: name,
        page
      }
    })
  }

  public getCastByMovieId(movieId: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/credits`, {
      params: {
        api_key: this.apiKey
      }
    })
  }

  public getRecommendationByMovieId(movieId: number): Observable<PaginateResult> {
    return this.http.get<any>(`${this.baseUrl}/movie/${movieId}/recommendations`, {
      params: {
        api_key: this.apiKey
      }
    })
  }
}
