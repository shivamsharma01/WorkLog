import { TestBed } from '@angular/core/testing';

import { NgbTimeStringAdapterService } from './ngb-time-string-adapter.service';

describe('NgbTimeStringAdapterService', () => {
  let service: NgbTimeStringAdapterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgbTimeStringAdapterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
