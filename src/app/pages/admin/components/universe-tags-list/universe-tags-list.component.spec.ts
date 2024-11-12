import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniverseTagsListComponent } from './universe-tags-list.component';

describe('UniverseTagsListComponent', () => {
  let component: UniverseTagsListComponent;
  let fixture: ComponentFixture<UniverseTagsListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UniverseTagsListComponent]
    });
    fixture = TestBed.createComponent(UniverseTagsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
