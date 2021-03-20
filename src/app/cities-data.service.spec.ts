import { TestBed } from '@angular/core/testing';

import { CitiesDataService } from './cities-data.service';

describe('CitiesDataService', () => {
  let service: CitiesDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CitiesDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
