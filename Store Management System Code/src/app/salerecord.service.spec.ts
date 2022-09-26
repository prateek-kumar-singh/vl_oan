import { TestBed } from '@angular/core/testing';

import { SalerecordService } from './salerecord.service';

describe('SalerecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SalerecordService = TestBed.get(SalerecordService);
    expect(service).toBeTruthy();
  });
});
