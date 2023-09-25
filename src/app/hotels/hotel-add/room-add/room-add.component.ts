import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { HotelsService } from '../../hotels.service';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-room-add',
  templateUrl: './room-add.component.html',
  styleUrls: ['./room-add.component.scss'],
})
export class RoomAddComponent implements OnInit, OnDestroy {
  isLoading: boolean = false;
  hotelId: string | undefined;
  uploadProgress = 0;
  uploadProgressSub = new Subscription();
  @ViewChild('filesInput', { static: true }) filesInput:
    | ElementRef<HTMLInputElement>
    | undefined;
  filesToUpload: File[] = [];
  imageUrls: string[] = [];
  initialImage: string | undefined;

  constructor(
    private hotelsService: HotelsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.hotelsService.uploadProgress$.subscribe({
      next: (progress) => (this.uploadProgress = progress),
    });
    this.hotelId = this.activatedRoute.snapshot.params['id'];
  }

  addRoom(form: NgForm) {
    this.isLoading = true;

    if (this.filesToUpload.length > 3) {
      this.clearPictures();
      return;
    }

    const room = new FormData();
    room.append('hotelId', this.hotelId!);
    room.append('category', form.value.category);
    room.append('description', form.value.description);
    room.append('price', form.value.price);
    this.filesToUpload.forEach((f) => room.append('uploadPhotos', f));

    this.hotelsService.addRoom(room).subscribe({
      complete: () => {
        this.isLoading = false;
        this.uploadProgress = 0;
        this.router.navigateByUrl(`/hotels/${this.hotelId}`);
      },
      error: (err) => {
        this.isLoading = false;
        console.log(err);
      },
    });
  }

  clearPictures() {
    this.filesToUpload = [];
    this.imageUrls = [];
    this.initialImage = undefined;
    this.filesInput!.nativeElement.value = '';
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

  ngOnDestroy(): void {
    this.uploadProgressSub.unsubscribe();
  }
}
