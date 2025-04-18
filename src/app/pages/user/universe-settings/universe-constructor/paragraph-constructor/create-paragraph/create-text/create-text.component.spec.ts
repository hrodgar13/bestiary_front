import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTextComponent } from './create-text.component';

describe('CreateTextComponent', () => {
  let component: CreateTextComponent;
  let fixture: ComponentFixture<CreateTextComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateTextComponent]
    });
    fixture = TestBed.createComponent(CreateTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
