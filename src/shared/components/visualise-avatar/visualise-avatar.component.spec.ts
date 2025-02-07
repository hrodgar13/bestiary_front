import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualiseAvatarComponent } from './visualise-avatar.component';

describe('VisualiseAvatarComponent', () => {
  let component: VisualiseAvatarComponent;
  let fixture: ComponentFixture<VisualiseAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VisualiseAvatarComponent]
    });
    fixture = TestBed.createComponent(VisualiseAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
