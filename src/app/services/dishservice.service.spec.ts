import { TestBed } from '@angular/core/testing';

import { DishserviceService } from './dishservice.service';

describe('DishserviceService', () => {
  let service: DishserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DishserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
