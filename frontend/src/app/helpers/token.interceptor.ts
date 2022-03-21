import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from "../../environments/environment";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        headers: request.headers.set('Content-Type', 'application/json'),
      });
    }

    const isApiUrl = request.url.startsWith(environment.API_BASE_URL);
    if (isApiUrl) {
      if (sessionStorage.getItem('token')) {
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        });
      }
    }
    return next.handle(request);
  }
}
