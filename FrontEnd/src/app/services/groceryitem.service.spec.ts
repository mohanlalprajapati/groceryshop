import { TestBed } from '@angular/core/testing';

import { GroceryItemService } from './groceryitem.service';

describe('GroceryitemService', () => {
  let service: GroceryItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GroceryItemService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
