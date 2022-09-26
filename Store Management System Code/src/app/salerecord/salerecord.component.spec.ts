import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalerecordComponent } from './salerecord.component';

describe('SalerecordComponent', () => {
  let component: SalerecordComponent;
  let fixture: ComponentFixture<SalerecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalerecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalerecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
