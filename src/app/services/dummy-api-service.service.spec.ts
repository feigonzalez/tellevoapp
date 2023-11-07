import { HttpClient, HttpHandler, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { DummyApiServiceService } from './dummy-api-service.service';

describe('DummyApiServiceService', () => {
  let service: DummyApiServiceService;

  beforeEach(async() => {
    await TestBed.configureTestingModule({
      providers:[HttpClient, HttpHandler]
    }).compileComponents();

    TestBed.configureTestingModule({});
    service = TestBed.inject(DummyApiServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
