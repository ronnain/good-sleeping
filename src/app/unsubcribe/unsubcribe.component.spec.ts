import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubcribeComponent } from './unsubcribe.component';

describe('UnsubcribeComponent', () => {
  let component: UnsubcribeComponent;
  let fixture: ComponentFixture<UnsubcribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnsubcribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubcribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
