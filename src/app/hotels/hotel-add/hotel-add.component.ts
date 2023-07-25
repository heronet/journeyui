import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hotel } from 'src/app/models/hotel';
import { HotelsService } from '../hotels.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.scss'],
})
export class HotelAddComponent {
  constructor(private hotelsService: HotelsService, private router: Router) {}
  isLoading = false;
  addHotel({ form }: NgForm) {
    this.isLoading = true;
    const hotel: Partial<Hotel> = {
      title: form.value.title,
      location: form.value.location,
      locationOnMap: form.value.locationOnMap,
      description: form.value.description,
      phone: form.value.phone.toString(),
      email: form.value.email,
    };
    this.hotelsService.addHotel(hotel).subscribe({
      next: (res) => {
        this.isLoading = false;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
}
