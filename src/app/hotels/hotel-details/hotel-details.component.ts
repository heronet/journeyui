import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HotelsService } from '../hotels.service';
import { Hotel } from 'src/app/models/hotel';
import { NgForm } from '@angular/forms';
import { Rating } from 'src/app/models/rating';
import { Photo } from 'src/app/models/photo';

@Component({
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.scss'],
})
export class HotelDetailsComponent implements OnInit {
  hotel: Hotel | undefined;
  addedStars = 1;
  previewImage: string | undefined;
  rateVisible = false;
  isLoading = false;
  tempImage =
    'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  constructor(
    private route: ActivatedRoute,
    private hotelsService: HotelsService
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe({
      next: (params) => {
        const id = params.get('id')!;
        this.hotelsService.getHotel(id).subscribe({
          next: (hotel) => {
            this.hotel = hotel;
            if (hotel.thumbnailUrl) this.previewImage = hotel.thumbnailUrl;
          },
          error: (err) => console.log(err),
        });
      },
    });
  }
  addRating({ value }: NgForm) {
    this.isLoading = true;
    const rating: Partial<Rating> = {
      stars: this.addedStars,
      text: value.text,
      hotelId: this.hotel?.id,
    };
    this.hotelsService.addRating(rating).subscribe({
      next: (res) => {
        this.rateVisible = false;
        this.isLoading = false;
        this.hotel?.ratings.unshift(res);
      },
      error: (err) => {
        this.rateVisible = false;
        this.isLoading = false;
        console.log(err);
      },
    });
  }
  addStars(id: number) {
    console.log(id);
    this.addedStars = id;
  }
  toggleRateVisible() {
    this.rateVisible = !this.rateVisible;
  }
  setPreview(image: Photo) {
    this.previewImage = image.imageUrl;
  }
}
