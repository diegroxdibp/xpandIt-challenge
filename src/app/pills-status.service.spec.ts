import { TestBed } from '@angular/core/testing';

import { PillsStatusService } from './pills-status.service';

describe('PillsStatusService', () => {
  let service: PillsStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PillsStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
