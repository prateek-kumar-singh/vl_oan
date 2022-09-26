import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaserecordComponent } from './purchaserecord.component';

describe('PurchaserecordComponent', () => {
  let component: PurchaserecordComponent;
  let fixture: ComponentFixture<PurchaserecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PurchaserecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaserecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
