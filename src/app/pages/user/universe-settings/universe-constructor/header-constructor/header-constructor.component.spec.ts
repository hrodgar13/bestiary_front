import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderConstructorComponent } from './header-constructor.component';

describe('HeaderConstructorComponent', () => {
  let component: HeaderConstructorComponent;
  let fixture: ComponentFixture<HeaderConstructorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderConstructorComponent]
    });
    fixture = TestBed.createComponent(HeaderConstructorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
