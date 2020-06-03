import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrentDeliveriesComponent } from './current-deliveries.component';

describe('CurrentDeliveriesComponent', () => {
  let component: CurrentDeliveriesComponent;
  let fixture: ComponentFixture<CurrentDeliveriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrentDeliveriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrentDeliveriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
