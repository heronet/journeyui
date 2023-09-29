import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AdminHotelsComponent } from './admin-hotels/admin-hotels.component';

@NgModule({
  declarations: [
    AdminHotelsComponent
  ],
  imports: [SharedModule, AdminRoutingModule],
})
export class AdminModule {}
