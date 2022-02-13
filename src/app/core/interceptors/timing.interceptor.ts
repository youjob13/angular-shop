import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (request.method === 'GET') {
      const requestStartTime = Date.now();

      return next.handle(request).pipe(
        tap((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            console.log(`Resolve Request Time: ${Date.now() - requestStartTime}
            \t Request data: ${request.url}`);
          }
        }),
        catchError((err) => {
          console.log(`Reject Request Time: ${Date.now() - requestStartTime}
          \t Request data: ${request.url}`);

          return throwError(err);
        })
      );
    }
    return next.handle(request);
  }
}
