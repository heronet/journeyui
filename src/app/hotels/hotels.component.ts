import { Component, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { HotelsService } from './hotels.service';
import { districts } from '../utils/utils';
import { District } from '../models/district';

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
  onLocationClick(location: District) {
    this.searchLocation = location.name;
    this.showLocations = false;
    this.searchHotels();
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
