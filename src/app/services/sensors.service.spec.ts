import { TestBed } from '@angular/core/testing';

import { SensorsService } from './sensors.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpClientModule } from '@angular/common/http';

describe('SensorsService', () => {
  let service: SensorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, HttpClientModule],
    });
    service = TestBed.inject(SensorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
