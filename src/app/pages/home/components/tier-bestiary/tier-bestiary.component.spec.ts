import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierBestiaryComponent } from './tier-bestiary.component';

describe('TierBestiaryComponent', () => {
  let component: TierBestiaryComponent;
  let fixture: ComponentFixture<TierBestiaryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierBestiaryComponent]
    });
    fixture = TestBed.createComponent(TierBestiaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
