import { TestBed, async, inject } from '@angular/core/testing';

import { EntryPointGuard } from './entry-point.guard';

describe('EntryPointGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EntryPointGuard]
    });
  });

  it('should ...', inject([EntryPointGuard], (guard: EntryPointGuard) => {
    expect(guard).toBeTruthy();
  }));
});
