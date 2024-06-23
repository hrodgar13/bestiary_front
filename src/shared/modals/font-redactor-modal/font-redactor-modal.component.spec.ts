import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontRedactorModalComponent } from './font-redactor-modal.component';

describe('FontRedactorModalComponent', () => {
  let component: FontRedactorModalComponent;
  let fixture: ComponentFixture<FontRedactorModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FontRedactorModalComponent]
    });
    fixture = TestBed.createComponent(FontRedactorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
