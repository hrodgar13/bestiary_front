import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BestiaryListComponent } from './bestiary-list.component';

describe('BestiaryListComponent', () => {
  let component: BestiaryListComponent;
  let fixture: ComponentFixture<BestiaryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BestiaryListComponent]
    });
    fixture = TestBed.createComponent(BestiaryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
