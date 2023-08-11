import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Hotel } from '../models/hotel';
import { HttpClient, HttpEventType } from '@angular/common/http';
import { Rating } from '../models/rating';
import { Subject, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HotelsService {
  BASE_URL = environment.baseUrl;

  private uploadProgressSource = new Subject<number>();
  uploadProgress$ = this.uploadProgressSource.asObservable();

  constructor(private http: HttpClient) {}

  getHotels(hotel: Partial<Hotel>) {
    return this.http.get<Hotel[]>(
      `${this.BASE_URL}/hotels?location=${hotel.location ?? ''}`
    );
  }
  getHotel(id: string) {
    return this.http.get<Hotel>(`${this.BASE_URL}/hotels/${id}`);
  }
  addHotel(hotel: FormData) {
    return this.http
      .post<Hotel>(`${this.BASE_URL}/hotels`, hotel, {
        reportProgress: true,
        observe: 'events',
      })
      .pipe(
        map((event) => {
          if (event.type === HttpEventType.UploadProgress) {
            const total: number = event.total ?? 1;
            const progress = Math.round((event.loaded / total) * 100);
            this.uploadProgressSource.next(progress);
          }
        })
      );
  }
  addRating(rating: Partial<Rating>) {
    return this.http.post<Rating>(`${this.BASE_URL}/hotels/rate`, rating);
  }
}
