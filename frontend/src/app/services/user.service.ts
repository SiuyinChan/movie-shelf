import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from "rxjs";
import {User} from "../models";
import {environment} from "../../environments/environment";
import {tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl = environment.API_BASE_URL;

  private readonly _user$: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public readonly user$: Observable<User | null> = this._user$.asObservable();

  public get currentUserValue(): User {
    return <User>this._user$.value;
  }

  public set currentUserValue(user: User) {
    this._user$.next(user);
  }

  constructor(private http: HttpClient) {
  }

  public getUserInfo(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/user/info`).pipe(tap((user: User) => {
      user.token = localStorage.getItem('token')!;
      this._user$.next(user);
    }))
  }
}
