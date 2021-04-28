import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookiesHandlerComponent } from './cookies-handler.component';

describe('CookiesHandlerComponent', () => {
  let component: CookiesHandlerComponent;
  let fixture: ComponentFixture<CookiesHandlerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CookiesHandlerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CookiesHandlerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
