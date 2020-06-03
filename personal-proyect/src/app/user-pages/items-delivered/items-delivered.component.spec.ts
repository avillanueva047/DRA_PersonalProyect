import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsDeliveredComponent } from './items-delivered.component';

describe('ItemsDeliveredComponent', () => {
  let component: ItemsDeliveredComponent;
  let fixture: ComponentFixture<ItemsDeliveredComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemsDeliveredComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemsDeliveredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
