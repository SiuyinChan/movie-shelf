import { Component, Input, OnInit } from '@angular/core';
import { Movie, UserMovieList } from "../../models";
import { Router } from "@angular/router";
import { UserMovieListService } from "../../services/user-movielist.service";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() public movie!: Movie;
  public score: number = 0;

  constructor(private readonly router: Router,
              private readonly userMovieListService: UserMovieListService) {
  }

  ngOnInit(): void {
    this.score = Math.round(this.movie.vote_average/2)
  }

  public navigateMovieDetails(): void {
    this.router.navigate(['movie', this.movie.id]).then();
  }

  public addMovieToWishlist(): void {
    this.userMovieListService.addMovieToList(this.movie.id, "WISH_LIST").subscribe();
  }

  public addMovieToWatchedList(): void {
    this.userMovieListService.addMovieToList(this.movie.id, "WATCHED_LIST").subscribe();
  }
}
