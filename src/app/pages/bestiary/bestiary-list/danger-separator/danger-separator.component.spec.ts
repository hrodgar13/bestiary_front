import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DangerSeparatorComponent } from './danger-separator.component';

describe('DangerSeparatorComponent', () => {
  let component: DangerSeparatorComponent;
  let fixture: ComponentFixture<DangerSeparatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DangerSeparatorComponent]
    });
    fixture = TestBed.createComponent(DangerSeparatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
