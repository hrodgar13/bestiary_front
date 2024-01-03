import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatblockInputComponent } from './statblock-input.component';

describe('StatblockInputComponent', () => {
  let component: StatblockInputComponent;
  let fixture: ComponentFixture<StatblockInputComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StatblockInputComponent]
    });
    fixture = TestBed.createComponent(StatblockInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
