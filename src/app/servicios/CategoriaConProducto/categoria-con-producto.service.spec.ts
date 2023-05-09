import { TestBed } from '@angular/core/testing';

import { CategoriaConProductoService } from './categoria-con-producto.service';

describe('CategoriaConProductoService', () => {
  let service: CategoriaConProductoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaConProductoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
