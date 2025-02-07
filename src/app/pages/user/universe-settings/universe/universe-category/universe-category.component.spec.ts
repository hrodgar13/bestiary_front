import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseCategoryComponent } from './universe-category.component';

describe('UniverseCategoryComponent', () => {
  let component: UniverseCategoryComponent;
  let fixture: ComponentFixture<UniverseCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniverseCategoryComponent]
    });
    fixture = TestBed.createComponent(UniverseCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
