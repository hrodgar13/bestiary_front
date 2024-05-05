import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiceRollComponent } from './create-dice-roll.component';

describe('CreateDiceRollComponent', () => {
  let component: CreateDiceRollComponent;
  let fixture: ComponentFixture<CreateDiceRollComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateDiceRollComponent]
    });
    fixture = TestBed.createComponent(CreateDiceRollComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
