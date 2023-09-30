import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';

@NgModule({
  declarations: [AdminHotelsComponent, AdminDashboardComponent],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
