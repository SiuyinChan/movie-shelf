import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { MovieService } from "../../services/movie.service";
import { ActiveCategory, Movie, MovieDetails, Movies, PaginateResult, Section } from "../../models";
import { UserMovieListService } from "../../services/user-movielist.service";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  public currentCategory: string = '';
  public searchedMovie: boolean = false;
  public movies: Movie[] = [];
  public sections: Section[] = [];
  public currentPage: number = 1;

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly movieService: MovieService,
    private readonly userMovieListService: UserMovieListService
  ) {
    this.movieService.getMovieGenres().subscribe(() => {
      this.sections = this.movieService.movieSections;
      this.route.params.subscribe((params) => {
        this.currentCategory = params['category'];
        this.searchedMovie = params['section'] === 'search';
        if (params['section'] === 'search') {
          this.movieService.getMoviesByName(params['category']).subscribe((r: PaginateResult) => {
            this.movies = r.results;
          })
        } else if (params['section'] === 'movie-list') {
          let tmp: Movie[] = [];
          this.userMovieListService.getMoviesInMovieList(params['category']).subscribe((movies: Movies) => {
            movies.movies.forEach((m => {
              this.movieService.getMovieById(m).subscribe((movieDetails: MovieDetails) => {
                tmp.push(movieDetails);
              })
            }))
            this.movies = tmp;
          });
        } else {
          this.movieService.getMoviesByCategory(params['category']).subscribe((r: PaginateResult) => {
            console.log(r.results);
            this.movies = r.results;
          })
        }
      });
    });
  }

  onCategoryClicked(event: ActiveCategory): void {
    this.currentPage = 1;
    this.router.navigate([event.section.toLowerCase(), event.category.toLowerCase()]).then();
  }

  onPageChange(type: string) {
    if (type === "after") {
      this.currentPage += 1;
    } else {
      this.currentPage -= 1;
    }
    this.route.params.subscribe((params) => {
      if (params['section'] === 'discover' || params['section'] === 'genres') {
        this.movieService.getMoviesByCategory(params['category'], 'popularity.desc', this.currentPage).subscribe((r: PaginateResult) => {
          console.log(r.results);
          this.movies = r.results;
        })
      } else {
        if (params['section'] === 'search') {
          this.movieService.getMoviesByName(params['category'], this.currentPage).subscribe((r: PaginateResult) => {
            this.movies = r.results;
          })
        }
      }
    });
  }
}
