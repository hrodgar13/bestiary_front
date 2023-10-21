import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateBeastComponent } from './create-beast.component';

describe('CreateBeastComponent', () => {
  let component: CreateBeastComponent;
  let fixture: ComponentFixture<CreateBeastComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreateBeastComponent]
    });
    fixture = TestBed.createComponent(CreateBeastComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
