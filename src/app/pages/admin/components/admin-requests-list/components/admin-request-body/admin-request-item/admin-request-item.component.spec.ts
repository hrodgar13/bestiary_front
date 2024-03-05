import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestItemComponent } from './admin-request-item.component';

describe('AdminRequestItemComponent', () => {
  let component: AdminRequestItemComponent;
  let fixture: ComponentFixture<AdminRequestItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestItemComponent]
    });
    fixture = TestBed.createComponent(AdminRequestItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
