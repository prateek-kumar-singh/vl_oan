import { TestBed } from '@angular/core/testing';

import { PurchaserecordService } from './purchaserecord.service';

describe('PurchaserecordService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PurchaserecordService = TestBed.get(PurchaserecordService);
    expect(service).toBeTruthy();
  });
});
