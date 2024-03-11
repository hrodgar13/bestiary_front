import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicBlockComponent } from './characteristic-block.component';

describe('CharacteristicBlockComponent', () => {
  let component: CharacteristicBlockComponent;
  let fixture: ComponentFixture<CharacteristicBlockComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CharacteristicBlockComponent]
    });
    fixture = TestBed.createComponent(CharacteristicBlockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
