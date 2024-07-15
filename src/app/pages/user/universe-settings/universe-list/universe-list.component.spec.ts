import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseListComponent } from './universe-list.component';

describe('UniverseListComponent', () => {
  let component: UniverseListComponent;
  let fixture: ComponentFixture<UniverseListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniverseListComponent]
    });
    fixture = TestBed.createComponent(UniverseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
