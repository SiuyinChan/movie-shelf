import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { TmdbService } from "../../services/tmdb.service";
import { Movie, MovieDetails } from "../../models";

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.scss']
})
export class MovieDetailsComponent implements OnInit {
  public movie!: MovieDetails;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly tmdbService: TmdbService) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      console.log(params['id']);
      this.tmdbService.getMovieById(params['id']).subscribe((movie: MovieDetails) => {
        this.movie = movie;
        console.log(movie);
      })
    })
  }
}
