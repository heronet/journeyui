import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotelsService } from '../hotels.service';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | undefined;
  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')!;
        this.hotelsService.getHotel(id).subscribe({
          next: (hotel) => (this.hotel = hotel),
        });
      },
    });
  }
}
