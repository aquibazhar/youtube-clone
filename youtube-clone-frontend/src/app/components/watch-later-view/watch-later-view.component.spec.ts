import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WatchLaterViewComponent } from './watch-later-view.component';

describe('WatchLaterViewComponent', () => {
  let component: WatchLaterViewComponent;
  let fixture: ComponentFixture<WatchLaterViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WatchLaterViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WatchLaterViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
