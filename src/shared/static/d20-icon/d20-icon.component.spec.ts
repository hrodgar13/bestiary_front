import { ComponentFixture, TestBed } from '@angular/core/testing';

import { D20IconComponent } from './d20-icon.component';

describe('D20IconComponent', () => {
  let component: D20IconComponent;
  let fixture: ComponentFixture<D20IconComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [D20IconComponent]
    });
    fixture = TestBed.createComponent(D20IconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
