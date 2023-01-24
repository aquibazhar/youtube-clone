import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionGridCardComponent } from './subscription-grid-card.component';

describe('SubscriptionGridCardComponent', () => {
  let component: SubscriptionGridCardComponent;
  let fixture: ComponentFixture<SubscriptionGridCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionGridCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionGridCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
