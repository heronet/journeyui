import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { AuthDto } from '../auth/authdto';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.authData$.pipe(
    take(1),
    map((data: AuthDto | undefined) => {
      const isAuth = data?.roles?.includes(
        'Admin' || 'Moderator' || 'SuperAdmin'
      );
      console.log(isAuth);

      if (isAuth) {
        return true;
      } else {
        return router.createUrlTree(['']);
      }
    })
  );
};
