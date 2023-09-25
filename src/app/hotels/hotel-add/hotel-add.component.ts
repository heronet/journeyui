import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HotelsService } from '../hotels.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { districts } from 'src/app/utils/utils';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.scss'],
})
export class HotelAddComponent {
  isLoading = false;

  locations = districts;
  constructor(private hotelsService: HotelsService, private router: Router) {}

  addHotel(form: NgForm) {
    this.isLoading = true;
    const data = form.value;

    const hotel: Partial<Hotel> = {
      title: data.title,
      location: data.location,
      locationOnMap: data.locationOnMap,
      phone: data.phone.toString(),
      email: data.email,
    };

    this.hotelsService.addHotel(hotel).subscribe({
      complete: () => {
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
