import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiSelectItemComponent } from './multi-select-item.component';

describe('MultiSelectItemComponent', () => {
  let component: MultiSelectItemComponent;
  let fixture: ComponentFixture<MultiSelectItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultiSelectItemComponent]
    });
    fixture = TestBed.createComponent(MultiSelectItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
