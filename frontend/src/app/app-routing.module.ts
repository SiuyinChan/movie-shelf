import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path: '', redirectTo: '1/1', pathMatch: 'full'},
  {
    path: 'movie/:id',
    loadChildren: () => import('./pages/movie-details/movie-details.module').then((m) => m.MovieDetailsModule)
  },
  {
    path: ':section/:category',
    loadChildren: () => import('./pages/homepage/homepage.module').then((m) => m.HomepageModule)
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
