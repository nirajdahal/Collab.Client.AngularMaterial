import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(private router: Router, private toastr: ToastrService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError(error => {
        if (error) {
          if (error.status === 400) {
            if (error.error.errors) {
              console.log(error.error)
              this.toastr.error(error.error.message, error.error.errors);
            } else {
              this.toastr.error(error.error.message);
            }
          }
          if (error.status === 401) {
            this.toastr.error(error.error.message);
          }
          if (error.status === 403) {
            this.toastr.error("You are not allowed to perform this action");
          }
          if (error.status === 404) {
            this.toastr.error(error.error.message)
            this.router.navigateByUrl('/');
          }
          if (error.status === 500) {
            const navigationExtras: NavigationExtras = { state: { error: error.error } }
            this.toastr.error("Something is wrong on the server! We will fix it soon", error.status)
          }
        }

        return throwError(error);
      })
    )
  }
}