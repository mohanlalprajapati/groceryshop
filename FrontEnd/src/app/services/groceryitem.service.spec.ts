import { TestBed } from '@angular/core/testing';

import { GroceryitemService } from './groceryitem.service';

describe('GroceryitemService', () => {
  let service: GroceryitemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryitemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
