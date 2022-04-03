import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { ActiveCategory, Movie, MovieDetails, PaginateResult, Section } from "../../models";
import { UserMovieListService } from "../../services/user-movielist.service";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent {
  public movie!: MovieDetails;
  public sections: Section[] = [];
  public casts: any;
  public recommendations?: Movie[];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private readonly userMovieListService: UserMovieListService
  ) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.getMovieDetails();
      }
    });
    this.movieService.getMovieGenres().subscribe(() => {
      this.sections = this.movieService.movieSections;
    });
  }

  getMovieDetails(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieService.getMovieById(parseInt(movieId)).subscribe((movie: MovieDetails) => {
        this.movie = movie;
        console.log(movie);
      });
      this.movieService.getCastByMovieId(parseInt(movieId)).subscribe((credits: any) => {
        this.casts = credits.cast.slice(0, 10);
      })
      this.movieService.getRecommendationByMovieId(parseInt(movieId)).subscribe((recommendations: PaginateResult) => {
        this.recommendations = recommendations.results;
      })
    }
  }

  onCategoryClicked(event: ActiveCategory): void {
    this.router.navigate([event.section.toLowerCase(), event.category.toLowerCase()]).then();
  }

  onGenreClicked(genre: string): void {
    this.router.navigate(['genres', genre.toLowerCase()]).then();
  }

  public addMovieToWishlist(event: Event): void {
    this.userMovieListService.addMovieToList(this.movie.id, "WISH_LIST").subscribe();
  }

  public addMovieToWatchedList(event: Event): void {
    this.userMovieListService.addMovieToList(this.movie.id, "WATCHED_LIST").subscribe();
  }
}
