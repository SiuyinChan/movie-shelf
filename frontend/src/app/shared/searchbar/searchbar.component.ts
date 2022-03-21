import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-searchbar',
  templateUrl: './searchbar.component.html',
  styleUrls: ['./searchbar.component.scss']
})
export class SearchbarComponent implements OnInit {

  constructor(private readonly router: Router ) { }

  ngOnInit(): void {
  }

  public navigate(movieName: string): void {
    this.router.navigate(['search', movieName.toLowerCase()]).then();
  }
}
