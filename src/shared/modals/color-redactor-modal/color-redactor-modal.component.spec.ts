import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorRedactorModalComponent } from './color-redactor-modal.component';

describe('ColorRedactorModalComponent', () => {
  let component: ColorRedactorModalComponent;
  let fixture: ComponentFixture<ColorRedactorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ColorRedactorModalComponent]
    });
    fixture = TestBed.createComponent(ColorRedactorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
