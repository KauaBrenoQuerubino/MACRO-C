import { TestBed } from '@angular/core/testing';

import { MicrosService } from './micros.service';

describe('MicrosService', () => {
  let service: MicrosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MicrosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
