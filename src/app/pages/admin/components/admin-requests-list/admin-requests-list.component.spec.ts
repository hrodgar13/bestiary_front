import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestsListComponent } from './admin-requests-list.component';

describe('AdminRequestsListComponent', () => {
  let component: AdminRequestsListComponent;
  let fixture: ComponentFixture<AdminRequestsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestsListComponent]
    });
    fixture = TestBed.createComponent(AdminRequestsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
