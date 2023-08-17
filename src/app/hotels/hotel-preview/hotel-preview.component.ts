import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Hotel } from 'src/app/models/hotel';

@Component({
  selector: 'app-hotel-preview',
  templateUrl: './hotel-preview.component.html',
  styleUrls: ['./hotel-preview.component.scss'],
})
export class HotelPreviewComponent {
  @Input() hotel: Hotel | undefined;
  @Input() isModifying = false;
  @Input() canModifyHotel = false;
  @Output() deleted = new EventEmitter<void>();
  tempImg =
    'https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';
  onDelete() {
    this.deleted.emit();
  }
}
