import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotelsComponent } from './hotels.component';
import { HotelDetailsComponent } from './hotel-details/hotel-details.component';
import { HotelAddComponent } from './hotel-add/hotel-add.component';

const routes: Routes = [
  { path: '', component: HotelsComponent, pathMatch: 'full' },
  { path: 'add-hotel', component: HotelAddComponent },
  { path: ':id', component: HotelDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HotelsRoutingModule {}
