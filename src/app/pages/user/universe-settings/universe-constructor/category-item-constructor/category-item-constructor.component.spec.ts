import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryItemConstructorComponent } from './category-item-constructor.component';

describe('CategoryItemConstructorComponent', () => {
  let component: CategoryItemConstructorComponent;
  let fixture: ComponentFixture<CategoryItemConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryItemConstructorComponent]
    });
    fixture = TestBed.createComponent(CategoryItemConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
