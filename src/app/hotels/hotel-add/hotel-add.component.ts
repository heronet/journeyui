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

@Component({
  selector: 'app-hotel-add',
  templateUrl: './hotel-add.component.html',
  styleUrls: ['./hotel-add.component.scss'],
})
export class HotelAddComponent implements OnInit, OnDestroy {
  isLoading = false;
  uploadProgress = 0;
  uploadProgressSub = new Subscription();
  @ViewChild('filesInput', { static: true }) filesInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  filesToUpload: File[] = [];
  imageUrls: string[] = [];
  initialImage: string | undefined;
  locations = districts;
  constructor(private hotelsService: HotelsService, private router: Router) {}

  ngOnInit(): void {
    this.hotelsService.uploadProgress$.subscribe({
      next: (progress) => (this.uploadProgress = progress),
    });
  }

  addHotel(form: NgForm) {
    this.isLoading = true;
    const data = form.value;

    if (this.filesToUpload.length > 3) {
      this.clearPictures();
      return;
    }
    const hotel = new FormData();
    hotel.append('title', data.title);
    hotel.append('location', data.location);
    hotel.append('locationOnMap', data.locationOnMap);
    hotel.append('description', data.description);
    hotel.append('phone', data.phone.toString());
    hotel.append('email', data.email);
    this.filesToUpload.forEach((f) => hotel.append('uploadPhotos', f));

    this.hotelsService.addHotel(hotel).subscribe({
      complete: () => {
        this.isLoading = false;
        this.uploadProgress = 0;
        this.router.navigateByUrl('/');
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }
  handleFileInput() {
    let files = this.filesInput!.nativeElement.files;
    for (let i = 0; i != files!.length; ++i) {
      // Collect files
      const file = files!.item(i)!;
      this.filesToUpload.push(file);
      // Read files to preview
      let reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrls.push(e.target!.result as string);
        if (!this.initialImage) this.initialImage = this.imageUrls[0];
      };
      reader.readAsDataURL(file);
    }
  }
  clearPictures() {
    this.filesToUpload = [];
    this.imageUrls = [];
    this.initialImage = undefined;
    this.filesInput!.nativeElement.value = '';
  }

  ngOnDestroy(): void {
    this.uploadProgressSub.unsubscribe();
  }
}
