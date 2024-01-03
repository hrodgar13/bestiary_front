import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTextInputComponent } from './title-text-input.component';

describe('TitleTextInputComponent', () => {
  let component: TitleTextInputComponent;
  let fixture: ComponentFixture<TitleTextInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleTextInputComponent]
    });
    fixture = TestBed.createComponent(TitleTextInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
