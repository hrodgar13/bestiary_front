import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnfinishedCreaturesListComponent } from './unfinished-creatures-list.component';

describe('CreaturesListComponent', () => {
  let component: UnfinishedCreaturesListComponent;
  let fixture: ComponentFixture<UnfinishedCreaturesListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnfinishedCreaturesListComponent]
    });
    fixture = TestBed.createComponent(UnfinishedCreaturesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
