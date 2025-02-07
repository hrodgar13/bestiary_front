import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNumberComponent } from './create-number.component';

describe('CreateNumberComponent', () => {
  let component: CreateNumberComponent;
  let fixture: ComponentFixture<CreateNumberComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateNumberComponent]
    });
    fixture = TestBed.createComponent(CreateNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
