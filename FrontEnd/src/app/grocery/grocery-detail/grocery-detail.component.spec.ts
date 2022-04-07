import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroceryDetailComponent } from './grocery-detail.component';

describe('GroceryDetailComponent', () => {
  let component: GroceryDetailComponent;
  let fixture: ComponentFixture<GroceryDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroceryDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroceryDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
