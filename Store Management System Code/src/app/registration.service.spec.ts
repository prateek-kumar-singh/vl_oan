import { TestBed } from '@angular/core/testing';

import { ChangenameService } from './registration.service';

describe('ChangenameService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ChangenameService = TestBed.get(ChangenameService);
    expect(service).toBeTruthy();
  });
});
