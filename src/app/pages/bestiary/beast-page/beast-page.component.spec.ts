import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BeastPageComponent } from './beast-page.component';

describe('BeastPageComponent', () => {
  let component: BeastPageComponent;
  let fixture: ComponentFixture<BeastPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BeastPageComponent]
    });
    fixture = TestBed.createComponent(BeastPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
