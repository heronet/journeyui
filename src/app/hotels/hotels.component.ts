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
  hotels: Hotel[] = [];
  constructor(private hotelsService: HotelsService) {}
  ngOnInit(): void {
    this.getHotels();
  }
  searchHotels(form: NgForm) {}
  getHotels() {
    this.hotelsService.getHotels().subscribe({
      next: (hotels) => (this.hotels = hotels),
      error: (err) => console.log(err),
    });
  }
}
