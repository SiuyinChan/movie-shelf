import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveCategory, Section } from "../../models";
import { Router } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() sections: Section[] = [];
  @Output() categoryClicked: EventEmitter<ActiveCategory> = new EventEmitter<ActiveCategory>();
  isLogged: boolean = false;

  constructor(private readonly router: Router) {
    this.isLogged = !!sessionStorage.getItem('token');
  }

  public navigateWishList() {
    this.router.navigate(['movie-list', 'wish-list']).then();
  }

  public navigateWatchedList() {
    this.router.navigate(['movie-list', 'watched-list']).then();
  }

  navigateHome() {
    this.router.navigate(['discover', 'popular']).then();
  }
}
