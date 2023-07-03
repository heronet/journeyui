import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';
import { AuthService } from './auth.service';
import { AuthDto } from './authdto';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authData$.pipe(
    take(1),
    map((data: AuthDto | undefined) => {
      if (data) {
        return state.url === '/auth/login' || state.url === '/auth/register'
          ? router.createUrlTree([''])
          : true;
      } else {
        return state.url === '/auth/login' || state.url === '/auth/register'
          ? true
          : router.createUrlTree(['auth/login']);
      }
    })
  );
};
