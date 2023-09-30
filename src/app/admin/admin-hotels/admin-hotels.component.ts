import { Component, OnInit } from '@angular/core';
import { HotelsService } from 'src/app/hotels/hotels.service';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-admin-hotels',
  templateUrl: './admin-hotels.component.html',
  styleUrls: ['./admin-hotels.component.scss'],
})
export class AdminHotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  constructor(private hotelsService: HotelsService) {}
  ngOnInit(): void {
    this.hotelsService.getHotels().subscribe({
      next: (hotels) => (this.hotels = hotels),
      error: (err) => console.log(err),
    });
  }
}
