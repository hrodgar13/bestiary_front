import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageRequestModalComponent } from './message-request.modal.component';

describe('MessageRequestModalComponent', () => {
  let component: MessageRequestModalComponent;
  let fixture: ComponentFixture<MessageRequestModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageRequestModalComponent]
    });
    fixture = TestBed.createComponent(MessageRequestModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
