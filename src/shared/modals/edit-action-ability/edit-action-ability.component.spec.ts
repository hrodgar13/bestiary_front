import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditActionAbilityComponent } from './edit-action-ability.component';

describe('EditActionAbilityComponent', () => {
  let component: EditActionAbilityComponent;
  let fixture: ComponentFixture<EditActionAbilityComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditActionAbilityComponent]
    });
    fixture = TestBed.createComponent(EditActionAbilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
