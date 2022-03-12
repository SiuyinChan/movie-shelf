import { NgModule } from '@angular/core';
import { HomepageComponent } from './homepage.component';
import { HomepageRoutingModule } from "./homepage-routing.module";
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { MovieCardModule } from "../../shared/movie-card/movie-card.module";

@NgModule({
  declarations: [HomepageComponent],
  imports: [
    HomepageRoutingModule,
    CommonModule,
    SidebarModule,
    MovieCardModule,
  ],
  exports: [HomepageComponent]
})
export class HomepageModule {
}
