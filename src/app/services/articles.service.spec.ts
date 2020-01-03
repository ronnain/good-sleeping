import { TestBed } from '@angular/core/testing';

import { ArtcilesService } from './articles.service';

describe('ArtcilesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ArtcilesService = TestBed.get(ArtcilesService);
    expect(service).toBeTruthy();
  });
});
