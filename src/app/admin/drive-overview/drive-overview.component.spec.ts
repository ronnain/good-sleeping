import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DriveOverviewComponent } from './drive-overview.component';

describe('DriveOverviewComponent', () => {
  let component: DriveOverviewComponent;
  let fixture: ComponentFixture<DriveOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DriveOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DriveOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
