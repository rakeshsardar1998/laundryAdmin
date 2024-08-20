import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('hi')
        return this.authService.getToken().pipe(
            take(1), 
            switchMap(data => {
                let token: string | null = null;
                if (data !== null) {
                    try {
                        const parsedData = JSON.parse(data);
                        token = parsedData.token; 
                    } catch (error) {
                        console.error('Error parsing token data:', error);
                    }
                }
                if (token) {
                    request = request.clone({
                        setHeaders: {
                            Authorization: `${token}`
                        }
                    });
                }
                return next.handle(request).pipe(
                    catchError((error: HttpErrorResponse) => {
                        if (error.status === 401) {
                            console.error('Invalid token:', error.error.message);
                            this.authService.logout(); // Logout if token is invalid
                        }
                        return throwError(error);
                    })
                );
            })
        );
    }
}
