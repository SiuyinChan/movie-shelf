import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TmdbService } from "../../services/tmdb.service";
import { ActiveCategory, Category, Movie, PaginateResult, Section } from "../../models";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  public currentCategory?: Category;
  public movies?: Movie[];

  public sections: Section[] = [
    {
      id: 1,
      title: 'Discover',
      categories: [
        {
          icon: '/assets/icons/cupcake-icon.svg',
          name: 'Popular',
          id: 1,
          endpoint: this.tmdbService.getPopularMovies.bind(this.tmdbService),
        },
        {
          icon: '/assets/icons/ginger-man-icon.svg',
          name: 'Top Rated',
          id: 2,
          endpoint: this.tmdbService.getTopRatedMovies.bind(this.tmdbService),
        },
        {
          icon: '/assets/icons/frites-icon.svg',
          name: 'Upcoming',
          id: 3,
          endpoint: this.tmdbService.getUpcomingMovies.bind(this.tmdbService),
        },
      ],
    },
    {
      id: 2,
      title: 'Genres',
      categories: [],
    },
  ];

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly tmdbService: TmdbService
  ) {
    this.tmdbService.getMovieGenres().subscribe((categories: Category[]) => {
      this.sections[1].categories = categories;
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.currentCategory = this.sections.find((s: Section) => s.id == params['section'])?.categories?.find((c: Category) => c.id == params['category']);
      if (!this.currentCategory) {
        this.router.navigate([1, 1])
      } else {
        if (params['section'] === '1' && this.currentCategory.endpoint) {
          this.currentCategory.endpoint().subscribe((p: PaginateResult) => {
            console.log(p);
            this.movies = p.results;
          });
        } else if (params['section'] === '2') {
          this.tmdbService.getMoviesByGenre(params['category']).subscribe((p: PaginateResult) => {
            this.movies = p.results;
          });
        }
      }
    })
  }

  onCategoryClicked(sidebarClickEvent: ActiveCategory): void {
    this.router.navigate([sidebarClickEvent.sectionId, sidebarClickEvent.categoryId]);
  }
}
