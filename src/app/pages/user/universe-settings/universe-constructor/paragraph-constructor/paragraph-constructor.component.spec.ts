import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphConstructorComponent } from './paragraph-constructor.component';

describe('ParagraphConstructorComponent', () => {
  let component: ParagraphConstructorComponent;
  let fixture: ComponentFixture<ParagraphConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParagraphConstructorComponent]
    });
    fixture = TestBed.createComponent(ParagraphConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
