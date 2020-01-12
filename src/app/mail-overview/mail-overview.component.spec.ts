import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailOverviewComponent } from './mail-overview.component';

describe('MailOverviewComponent', () => {
  let component: MailOverviewComponent;
  let fixture: ComponentFixture<MailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
