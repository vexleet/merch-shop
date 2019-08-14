import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchShopComponent } from './merch-shop.component';

describe('MerchShopComponent', () => {
  let component: MerchShopComponent;
  let fixture: ComponentFixture<MerchShopComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchShopComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
