import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyPlaylistComponent } from './empty-playlist.component';

describe('EmptyPlaylistComponent', () => {
  let component: EmptyPlaylistComponent;
  let fixture: ComponentFixture<EmptyPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmptyPlaylistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
