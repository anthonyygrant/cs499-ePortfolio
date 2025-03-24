import { TestBed } from '@angular/core/testing';

import { TravlrRedirectService } from './travlr-redirect.service';

describe('TravlrRedirectService', () => {
  let service: TravlrRedirectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TravlrRedirectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
