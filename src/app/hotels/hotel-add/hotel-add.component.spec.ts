import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelAddComponent } from './hotel-add.component';

describe('HotelAddComponent', () => {
  let component: HotelAddComponent;
  let fixture: ComponentFixture<HotelAddComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HotelAddComponent]
    });
    fixture = TestBed.createComponent(HotelAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
