import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { HotelsService } from './hotels.service';
import { districts } from '../utils/utils';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  searchLocation = '';
  showLocations = false;
  hotels: Hotel[] = [];
  locations = districts;
  constructor(private hotelsService: HotelsService) {}
  ngOnInit(): void {
    // this.getHotels({});
  }
  searchHotels() {
    if (
      this.locations.some((l) =>
        l.name.toLocaleLowerCase().includes(this.searchLocation)
      )
    )
      return;
    const hotel: Partial<Hotel> = {
      location: this.searchLocation,
    };
    this.getHotels(hotel);
  }
  getHotels(hotel: Partial<Hotel>) {
    this.hotelsService.getHotels(hotel).subscribe({
      next: (hotels) => (this.hotels = hotels),
      error: (err) => console.log(err),
    });
  }
  onLocationClick(location: string) {
    this.searchLocation = location;
    this.showLocations = false;
  }
  onKeyPress() {
    if (!this.showLocations) this.showLocations = true;
  }
  getLocations() {
    if (this.searchLocation) {
      return this.locations.filter((l) =>
        l.name
          .toLocaleLowerCase()
          .includes(this.searchLocation.toLocaleLowerCase())
      );
    }
    return this.locations;
  }
}
