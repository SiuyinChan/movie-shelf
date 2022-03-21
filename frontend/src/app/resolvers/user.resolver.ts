import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {catchError, concatMap, take} from 'rxjs/operators';
import {User} from "../models";
import { UserService } from "../services/user.service";

@Injectable({providedIn: 'root'})
export class UserResolver implements Resolve<User | null> {
  constructor(
    private readonly userService: UserService
  ) {
  }

  resolve(): Observable<User | null> {
    if (sessionStorage.getItem('token')) {
      return this.userService.user$.pipe(
        take(1),
        concatMap((user: User | null) => {
          if (user) {
            return of(user);
          }
          return this.userService
            .getUserInfo()
            .pipe(catchError(() => of(null)));
        })
      );
    }
    return of(null);
  }
}
