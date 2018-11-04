import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PriorityOrderComponent } from './priority-order.component';

describe('PriorityOrderComponent', () => {
  let component: PriorityOrderComponent;
  let fixture: ComponentFixture<PriorityOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PriorityOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PriorityOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
