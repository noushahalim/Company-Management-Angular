import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  let token = authService.token;
  let authRequest = req;

  if(token) {
    authRequest = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return next(authRequest).pipe(
    catchError(error => {
      if (error.status === 401) {
        const refreshToken = authService.refreshToken;

        if (refreshToken) {
          const refreshData = {
            token: authService.token,
            clientId: 'ERPWebApp',
            refreshToken: authService.refreshToken
          };

          return authService.validateRefreshToken(refreshData).pipe(
            switchMap((response: any) => {
              authService.token = response.data.token;
              localStorage.setItem('token', response.data.token);
              authService.refreshToken = response.data.refreshToken;
              localStorage.setItem('refreshToken', response.data.refreshToken);

              const newRequest = req.clone({
                setHeaders: {
                  Authorization: `Bearer ${response.data.token}`
                }
              });

              return next(newRequest);
            }),
            catchError(refreshError => {
              authService.logout();
              return throwError(refreshError);
            })
          );
        } else {
          authService.logout();
        }
      }
      
      return throwError(error);
    })
  );
};
