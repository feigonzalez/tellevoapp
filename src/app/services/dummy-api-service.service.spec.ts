import { TestBed } from '@angular/core/testing';

import { DummyApiServiceService } from './dummy-api-service.service';

describe('DummyApiServiceService', () => {
  let service: DummyApiServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
