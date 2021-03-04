import { TestBed } from '@angular/core/testing';

import { TccDataService } from './tcc-data.service';

describe('TccDataService', () => {
  let service: TccDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TccDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
