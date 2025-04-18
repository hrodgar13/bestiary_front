import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParagraphActionsModalComponent } from './paragraph-actions-modal.component';

describe('ParagraphActionsModalComponent', () => {
  let component: ParagraphActionsModalComponent;
  let fixture: ComponentFixture<ParagraphActionsModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParagraphActionsModalComponent]
    });
    fixture = TestBed.createComponent(ParagraphActionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
