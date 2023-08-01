import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';
import { HttpClient } from '@angular/common/http';
import { Rating } from '../models/rating';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  BASE_URL = environment.baseUrl;
  constructor(private http: HttpClient) {}

  getHotels(hotel: Partial<Hotel>) {
    return this.http.get<Hotel[]>(
      `${this.BASE_URL}/hotels?location=${hotel.location ?? ''}`
    );
  }
  getHotel(id: string) {
    return this.http.get<Hotel>(`${this.BASE_URL}/hotels/${id}`);
  }
  addHotel(hotel: Partial<Hotel>) {
    return this.http.post<Hotel>(`${this.BASE_URL}/hotels`, hotel);
  }
  addRating(rating: Partial<Rating>) {
    return this.http.post<Rating>(`${this.BASE_URL}/hotels/rate`, rating);
  }
}
