import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BorderOutlineComponent } from './border-outline.component';

describe('BorderOutlineComponent', () => {
  let component: BorderOutlineComponent;
  let fixture: ComponentFixture<BorderOutlineComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BorderOutlineComponent]
    });
    fixture = TestBed.createComponent(BorderOutlineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
