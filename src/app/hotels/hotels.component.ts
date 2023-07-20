import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel } from '../models/hotel';
import { HotelsService } from './hotels.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit {
  searchLocation = '';
  hotels: Hotel[] = [];
  constructor(private hotelsService: HotelsService) {}
  ngOnInit(): void {
    // this.getHotels({});
  }
  searchHotels({ form }: NgForm) {
    const hotel: Partial<Hotel> = {
      location: form.value.location,
    };
    this.getHotels(hotel);
  }
  getHotels(hotel: Partial<Hotel>) {
    this.hotelsService.getHotels(hotel).subscribe({
      next: (hotels) => (this.hotels = hotels),
      error: (err) => console.log(err),
    });
  }
}
