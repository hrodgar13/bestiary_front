import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TitleTextItemComponent } from './title-text-item.component';

describe('TitleTextItemComponent', () => {
  let component: TitleTextItemComponent;
  let fixture: ComponentFixture<TitleTextItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TitleTextItemComponent]
    });
    fixture = TestBed.createComponent(TitleTextItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
