import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseBodyComponent } from './universe-body.component';

describe('UniverseBodyComponent', () => {
  let component: UniverseBodyComponent;
  let fixture: ComponentFixture<UniverseBodyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniverseBodyComponent]
    });
    fixture = TestBed.createComponent(UniverseBodyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
