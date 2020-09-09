import { TestBed } from '@angular/core/testing';

import { EsServiceService } from './es-service.service';

describe('EsServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EsServiceService = TestBed.get(EsServiceService);
    expect(service).toBeTruthy();
  });
});
