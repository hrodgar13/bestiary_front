import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreaturesFilterComponent } from './creatures-filter.component';

describe('CreaturesFilterComponent', () => {
  let component: CreaturesFilterComponent;
  let fixture: ComponentFixture<CreaturesFilterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreaturesFilterComponent]
    });
    fixture = TestBed.createComponent(CreaturesFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
