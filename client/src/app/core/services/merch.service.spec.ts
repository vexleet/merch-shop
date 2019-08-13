import { TestBed } from '@angular/core/testing';

import { MerchService } from './merch.service';

describe('MerchService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MerchService = TestBed.get(MerchService);
    expect(service).toBeTruthy();
  });
});
