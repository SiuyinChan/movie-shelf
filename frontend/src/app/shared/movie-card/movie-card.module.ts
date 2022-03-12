import { NgModule } from '@angular/core';
import { MovieCardComponent } from "./movie-card.component";
import { CommonModule } from "@angular/common";

@NgModule({
  declarations: [MovieCardComponent],
  imports: [
    CommonModule
  ],
  exports: [MovieCardComponent]
})
export class MovieCardModule {
}
