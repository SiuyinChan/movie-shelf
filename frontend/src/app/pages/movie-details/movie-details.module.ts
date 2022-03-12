import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { SidebarModule } from "../../shared/sidebar/sidebar.module";
import { MovieCardModule } from "../../shared/movie-card/movie-card.module";
import { MovieDetailsComponent } from "./movie-details.component";
import { MovieDetailsRoutingModule } from "./movie-details-routing.module";
import { AppLayoutModule } from "../../layouts/app-layout/app-layout.module";

@NgModule({
  declarations: [MovieDetailsComponent],
    imports: [
        MovieDetailsRoutingModule,
        CommonModule,
        SidebarModule,
        MovieCardModule,
        AppLayoutModule,
    ],
  exports: [MovieDetailsComponent]
})
export class MovieDetailsModule {
}
