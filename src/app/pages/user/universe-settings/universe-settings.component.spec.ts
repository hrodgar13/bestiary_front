import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseSettingsComponent } from './universe-settings.component';

describe('UserverseSettingsComponent', () => {
  let component: UniverseSettingsComponent;
  let fixture: ComponentFixture<UniverseSettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniverseSettingsComponent]
    });
    fixture = TestBed.createComponent(UniverseSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
