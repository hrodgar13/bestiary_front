import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateParagraphComponent } from './create-paragraph.component';

describe('CreateParagraphComponent', () => {
  let component: CreateParagraphComponent;
  let fixture: ComponentFixture<CreateParagraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateParagraphComponent]
    });
    fixture = TestBed.createComponent(CreateParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
