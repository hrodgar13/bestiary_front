import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRequestBodyComponent } from './admin-request-body.component';

describe('AdminRequestBodyComponent', () => {
  let component: AdminRequestBodyComponent;
  let fixture: ComponentFixture<AdminRequestBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminRequestBodyComponent]
    });
    fixture = TestBed.createComponent(AdminRequestBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
