import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetrieveMailComponent } from './retrieve-mail.component';

describe('RetrieveMailComponent', () => {
  let component: RetrieveMailComponent;
  let fixture: ComponentFixture<RetrieveMailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetrieveMailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetrieveMailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
