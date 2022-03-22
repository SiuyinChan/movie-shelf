import { Component, OnInit } from '@angular/core';
import { ActiveCategory, MovieDetails, Movies, Section } from "../../models";
import { Router } from "@angular/router";
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
  public wishlistMovies!: number;
  public watchedlistMovies!: number;
  public username: string;

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
    private readonly userService: UserService,
    private readonly userMovieListService: UserMovieListService
  ) {
    this.profileForm = this.fb.group({
      username: [this.userService.currentUserValue.username, [Validators.required]],
      email: [this.userService.currentUserValue.email, [Validators.required, Validators.email]],
      password: [this.userService.currentUserValue.password, [Validators.required]],
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
  }

}
