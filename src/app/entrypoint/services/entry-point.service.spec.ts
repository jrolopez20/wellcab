import { TestBed } from '@angular/core/testing';

import { EntryPointService } from './entry-point.service';

describe('EntryPointService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EntryPointService = TestBed.get(EntryPointService);
    expect(service).toBeTruthy();
  });
});
