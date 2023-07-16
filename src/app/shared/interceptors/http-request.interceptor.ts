import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import {of} from 'rxjs';
import {catchError, finalize, map} from 'rxjs/operators';
import {MessageService} from 'primeng/api';

import {Router} from '@angular/router';
import {LoadingService} from "../services/loading.service";

@Injectable()
export class HttpRequestInterceptor implements HttpInterceptor {

  constructor(
    private messageService: MessageService,
    private loadingService: LoadingService,
    private router: Router
  ) {
  }

intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ) {
    const headers =
      new HttpHeaders({
        ... { 'Content-Type': 'application/json' }
      });
    this.loadingService.setLoading(true);
    req = req.clone({ headers });
    return next.handle(req).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          return event.clone({
            body: event.body
          });
        }
        return event;
      }),
      finalize(() => {
        this.loadingService.setLoading(false);
      }),
      catchError((error: HttpErrorResponse) => {
        if ([422, 404, 400].includes(error.status)) {
          if (error?.error instanceof Array) {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: 'Não foi possível processar sua solicitação.'
            });
          } else {
            this.messageService.add({
              summary: 'Erro',
              severity: 'warn',
              detail: error?.error?.error || 'Não foi possível processar sua solicitação.'
            });
          }
        } else if ([401, 403].includes(error.status)) {
          this.router.navigate(['/login']).then(r => r);
        } else {
          this.messageService.add({
            summary: 'Erro',
            severity: 'warn',
            detail: error?.error?.error || 'Não foi possível processar sua solicitação.'
          });
        }
        return of(new HttpResponse({
          body: {
            success: false,
            data: error?.error,
            message: error?.error?.error || error?.message,
          }
        }));
      })
    )
  }
}
