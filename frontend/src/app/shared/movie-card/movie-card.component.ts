import { Component, Input, OnInit } from '@angular/core';
import { Movie } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  @Input() public movie!: Movie;
  public score: number = 0;

  constructor(private readonly router: Router) {
  }

  ngOnInit(): void {
    this.score = Math.round(this.movie.vote_average/2)
  }

  public navigate(movieId: number): void {
    this.router.navigate(['movie', movieId]).then();
  }
}
