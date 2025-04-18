import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDateComponent } from './create-date.component';

describe('CreateDateComponent', () => {
  let component: CreateDateComponent;
  let fixture: ComponentFixture<CreateDateComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDateComponent]
    });
    fixture = TestBed.createComponent(CreateDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
