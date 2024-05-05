import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiceRollSnackComponent } from './dice-roll-snack.component';

describe('DiceRollSnackComponent', () => {
  let component: DiceRollSnackComponent;
  let fixture: ComponentFixture<DiceRollSnackComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DiceRollSnackComponent]
    });
    fixture = TestBed.createComponent(DiceRollSnackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
