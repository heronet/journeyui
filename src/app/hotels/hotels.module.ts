import { NgModule } from '@angular/core';

import { HotelsRoutingModule } from './hotels-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HotelsComponent } from './hotels.component';
import { HotelComponent } from './hotel/hotel.component';

@NgModule({
  declarations: [HotelsComponent, HotelComponent],
  imports: [SharedModule, HotelsRoutingModule],
})
export class HotelsModule {}
