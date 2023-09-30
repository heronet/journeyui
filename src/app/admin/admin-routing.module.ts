import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: AdminDashboardComponent },
      { path: 'hotels', component: AdminHotelsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
