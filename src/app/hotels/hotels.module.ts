import { NgModule } from '@angular/core';

import { HotelsRoutingModule } from './hotels-routing.module';
import { SharedModule } from '../shared/shared.module';
import { HotelsComponent } from './hotels.component';
import { HotelPreviewComponent } from './hotel-preview/hotel-preview.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelAddComponent } from './hotel-add/hotel-add.component';

@NgModule({
  declarations: [HotelsComponent, HotelPreviewComponent, HotelDetailsComponent, HotelAddComponent],
  imports: [SharedModule, HotelsRoutingModule],
})
export class HotelsModule {}
