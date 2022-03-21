import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";
import { Movies, UserMovieList } from "../models";
import { UserService } from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class UserMovieListService {

  private baseUrl = environment.API_BASE_URL;

  constructor(private http: HttpClient, private userService: UserService) {
  }

  addMovieToList(userMovieList: UserMovieList) : Observable<UserMovieList> {
    return this.http.post<UserMovieList>(`${this.baseUrl}/movie-lists/create`, userMovieList)
  }

  getMoviesInMovieList(listType: string) : Observable<Movies> {
    let userId = 2;
    return this.http.get<Movies>(`${this.baseUrl}/movie-lists/${listType}/${userId}`);
  }
}
