import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailHandlerComponent } from './mail-handler.component';

describe('MailHandlerComponent', () => {
  let component: MailHandlerComponent;
  let fixture: ComponentFixture<MailHandlerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailHandlerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
