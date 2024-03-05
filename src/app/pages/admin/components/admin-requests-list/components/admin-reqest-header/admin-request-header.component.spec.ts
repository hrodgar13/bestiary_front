import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestHeaderComponent } from './admin-request-header.component';

describe('AdminReqestHeaderComponent', () => {
  let component: AdminRequestHeaderComponent;
  let fixture: ComponentFixture<AdminRequestHeaderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestHeaderComponent]
    });
    fixture = TestBed.createComponent(AdminRequestHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
