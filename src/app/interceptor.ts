import { ModalComponent } from './components/modal/modal.component';
import { Statuses } from './models/enums';
import { tap, map } from 'rxjs/operators';
import * as M from 'materialize-css/dist/js/materialize';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
@Injectable()
export class MyInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(
        (res) => {},
        (err) => {
          if (err.status === Statuses.AuthenticationError) {
            this.router.navigate(['/login']);
          } else if (err.status === Statuses.UnknownError) {
            M.toast({
              html: 'Wystąpił błąd. Sprawdź połączenie z internetem',
              classes: 'rounded',
            });
          }
        }
      )
    );
  }
}
