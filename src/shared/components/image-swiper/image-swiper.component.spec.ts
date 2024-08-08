import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageSwiperComponent } from './image-swiper.component';

describe('ImageSwiperComponent', () => {
  let component: ImageSwiperComponent;
  let fixture: ComponentFixture<ImageSwiperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageSwiperComponent]
    });
    fixture = TestBed.createComponent(ImageSwiperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
