import { Component, OnInit } from '@angular/core';
import { ActiveCategory, MovieDetails, Movies, Section } from "../../models";
import { ActivatedRoute, Router } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { UserService } from "../../services/user.service";
import { UserMovieListService } from "../../services/user-movielist.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public profileForm: FormGroup;
  public passwordForm: FormGroup;
  public wishlistMovies!: number;
  public watchedlistMovies!: number;
  public username: string;
  public showInformation!: boolean;

  public sections: Section[] = [{
    id: 1,
    title: 'Profile',
    categories: [
      {
        id: 1,
        name: 'Information',
      },
      {
        id: 2,
        name: 'Setting',
      },
    ]
  }];

  constructor(
    private readonly router: Router,
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly userService: UserService,
    private readonly userMovieListService: UserMovieListService
  ) {
    this.route.params.subscribe((params) => {
      if (params['category'] === "information") {
        this.showInformation = true;
      } else {
        this.showInformation = false;
      }
    })

    this.profileForm = this.fb.group({
      username: [this.userService.currentUserValue.username, [Validators.required]],
      email: [this.userService.currentUserValue.email, [Validators.required, Validators.email]],
    });

    this.passwordForm = this.fb.group({
      password: [null, [Validators.required]],
    });

    this.userMovieListService.getMoviesInMovieList('wish-list').subscribe((movies: Movies) => {
      this.wishlistMovies = movies.movies.length;
    });

    this.userMovieListService.getMoviesInMovieList('watched-list').subscribe((movies: Movies) => {
      this.watchedlistMovies = movies.movies.length;
    });

    this.username = this.userService.currentUserValue.username;
  }

  ngOnInit(): void {
  }

  onCategoryClicked(event: ActiveCategory): void {
    this.router.navigate([event.section.toLowerCase(), event.category.toLowerCase()]).then();
  }

  public navigateWishList() {
    this.router.navigate(['movie-list', 'wish-list']).then();
  }

  public navigateWatchedList() {
    this.router.navigate(['movie-list', 'watched-list']).then();
  }

  updateBasicInfo() {
    this.userService.updateUser(this.profileForm.value).subscribe();
  }

  updatePassword() {
    this.userService.updateUser(this.passwordForm.value).subscribe();
  }
}
