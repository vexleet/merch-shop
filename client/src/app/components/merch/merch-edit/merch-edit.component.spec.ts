import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchEditComponent } from './merch-edit.component';

describe('MerchEditComponent', () => {
  let component: MerchEditComponent;
  let fixture: ComponentFixture<MerchEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
