import { TestBed } from '@angular/core/testing';

import { HttpmsgService } from './httpmsg.service';

describe('HttpmsgService', () => {
  let service: HttpmsgService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpmsgService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
