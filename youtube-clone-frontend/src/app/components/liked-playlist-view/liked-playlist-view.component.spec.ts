import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikedPlaylistViewComponent } from './liked-playlist-view.component';

describe('LikedPlaylistViewComponent', () => {
  let component: LikedPlaylistViewComponent;
  let fixture: ComponentFixture<LikedPlaylistViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LikedPlaylistViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikedPlaylistViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
