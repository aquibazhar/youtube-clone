import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryCardViewComponent } from './history-card-view.component';

describe('HistoryCardViewComponent', () => {
  let component: HistoryCardViewComponent;
  let fixture: ComponentFixture<HistoryCardViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistoryCardViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryCardViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
