import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGreenBtnComponent } from './input-green-btn.component';

describe('InputGreenBtnComponent', () => {
  let component: InputGreenBtnComponent;
  let fixture: ComponentFixture<InputGreenBtnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputGreenBtnComponent]
    });
    fixture = TestBed.createComponent(InputGreenBtnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
