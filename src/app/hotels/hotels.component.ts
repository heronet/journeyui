import { Component, OnDestroy, OnInit } from '@angular/core';
import { Hotel } from '../models/hotel';
import { HotelsService } from './hotels.service';
import { districts } from '../utils/utils';
import { District } from '../models/district';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  styleUrls: ['./hotels.component.scss'],
})
export class HotelsComponent implements OnInit, OnDestroy {
  searchLocation = '';
  showLocations = false;
  isModifyingHotel = false;
  canModifyHotel = false;
  hotels: Hotel[] = [];
  locations = districts;
  authSub: Subscription = new Subscription();

  constructor(
    private hotelsService: HotelsService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setAccess();
  }
  searchHotels() {
    this.getHotels(this.searchLocation);
  }
  getHotels(location: string) {
    this.hotelsService.getHotels(location).subscribe({
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
  removeHotel(id: string) {
    this.isModifyingHotel = true;
    this.hotelsService.deleteHotel(id).subscribe({
      next: () => {
        this.hotels = this.hotels.filter((h) => h.id !== id);
        this.isModifyingHotel = false;
      },
      error: (err) => {
        console.log(err);
        this.isModifyingHotel = false;
      },
      complete: () => (this.isModifyingHotel = false),
    });
  }
  setAccess() {
    this.authSub = this.authService.authData$.subscribe({
      next: (authData) => {
        if (
          authData?.roles?.some(
            (x) => x == 'SuperAdmin' || x == 'Admin' || x == 'Moderator'
          )
        )
          this.canModifyHotel = true;
        else this.canModifyHotel = false;
      },
    });
  }
  ngOnDestroy(): void {
    this.authSub.unsubscribe();
  }
}
