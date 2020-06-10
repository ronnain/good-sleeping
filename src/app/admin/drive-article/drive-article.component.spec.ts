import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveArticleComponent } from './drive-article.component';

describe('DriveArticleComponent', () => {
  let component: DriveArticleComponent;
  let fixture: ComponentFixture<DriveArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveArticleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveArticleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
