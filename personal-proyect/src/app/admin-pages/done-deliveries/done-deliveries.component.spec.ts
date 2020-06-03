import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoneDeliveriesComponent } from './done-deliveries.component';

describe('DoneDeliveriesComponent', () => {
  let component: DoneDeliveriesComponent;
  let fixture: ComponentFixture<DoneDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoneDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoneDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
