import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TierFirstComponent } from './tier-first.component';

describe('TierFirstComponent', () => {
  let component: TierFirstComponent;
  let fixture: ComponentFixture<TierFirstComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TierFirstComponent]
    });
    fixture = TestBed.createComponent(TierFirstComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
