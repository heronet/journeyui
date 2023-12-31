import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { adminGuard } from './admin/admin.guard';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [adminGuard],
  },
  {
    path: 'hotels',
    loadChildren: () =>
      import('./hotels/hotels.module').then((m) => m.HotelsModule),
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
    canActivate: [authGuard],
  },
  {
    path: '',
    redirectTo: 'hotels',
    pathMatch: 'full',
  },
  {
    path: '**',
    component: ErrorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
