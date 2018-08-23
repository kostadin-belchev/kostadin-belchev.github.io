import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductStartComponent } from './product-start.component';

describe('ProductStartComponent', () => {
  let component: ProductStartComponent;
  let fixture: ComponentFixture<ProductStartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProductStartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductStartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
