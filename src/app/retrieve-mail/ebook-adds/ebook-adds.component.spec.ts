import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookAddsComponent } from './ebook-adds.component';

describe('EbookAddsComponent', () => {
  let component: EbookAddsComponent;
  let fixture: ComponentFixture<EbookAddsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookAddsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookAddsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
