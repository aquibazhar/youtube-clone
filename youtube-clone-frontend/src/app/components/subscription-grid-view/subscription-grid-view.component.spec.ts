import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionGridViewComponent } from './subscription-grid-view.component';

describe('SubscriptionGridViewComponent', () => {
  let component: SubscriptionGridViewComponent;
  let fixture: ComponentFixture<SubscriptionGridViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionGridViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionGridViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
