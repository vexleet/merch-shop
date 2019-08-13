import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchComponent } from './create-merch.component';

describe('CreateMerchComponent', () => {
  let component: CreateMerchComponent;
  let fixture: ComponentFixture<CreateMerchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMerchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
