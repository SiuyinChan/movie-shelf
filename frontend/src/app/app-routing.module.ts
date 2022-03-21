import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserResolver } from "./resolvers/user.resolver";

const routes: Routes = [
  {path: '', redirectTo: 'discover/popular', pathMatch: 'full'},
  {
    path: 'movie/:id',
    loadChildren: () => import('./pages/movie-details/movie-details.module').then((m) => m.MovieDetailsModule)
  },
  {
    path: 'auth/:authType',
    loadChildren: () => import('./pages/auth/auth.module').then((m) => m.AuthModule)
  },
  {
    path: ':section/:category',
    loadChildren: () => import('./pages/homepage/homepage.module').then((m) => m.HomepageModule),
    resolve: {
      user: UserResolver,
    }
  },
  {path: '**', redirectTo: ''},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
