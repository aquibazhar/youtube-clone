import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscriptionListViewComponent } from './subscription-list-view.component';

describe('SubscriptionListViewComponent', () => {
  let component: SubscriptionListViewComponent;
  let fixture: ComponentFixture<SubscriptionListViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscriptionListViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubscriptionListViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
