import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelAddComponent } from './hotel-add/hotel-add.component';
import { RoomAddComponent } from './hotel-add/room-add/room-add.component';

const routes: Routes = [
  { path: '', component: HotelsComponent, pathMatch: 'full' },
  { path: 'add-hotel', component: HotelAddComponent },
  {
    path: ':id',
    children: [
      { path: '', component: HotelDetailsComponent, pathMatch: 'full' },
      { path: 'add-room', component: RoomAddComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
