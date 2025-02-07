import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DescriptionStructuralParagraphComponent } from './description-structural-paragraph.component';

describe('DescriptionStructuralParagraphComponent', () => {
  let component: DescriptionStructuralParagraphComponent;
  let fixture: ComponentFixture<DescriptionStructuralParagraphComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DescriptionStructuralParagraphComponent]
    });
    fixture = TestBed.createComponent(DescriptionStructuralParagraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
