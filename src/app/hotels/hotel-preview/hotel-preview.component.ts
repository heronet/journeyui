import { Component, Input } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-preview',
  templateUrl: './hotel-preview.component.html',
  styleUrls: ['./hotel-preview.component.scss'],
})
export class HotelPreviewComponent {
  @Input() hotel: Hotel | undefined;
}
