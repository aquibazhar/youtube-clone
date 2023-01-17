import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchVideosComponent } from './search-videos.component';

describe('SearchVideosComponent', () => {
  let component: SearchVideosComponent;
  let fixture: ComponentFixture<SearchVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchVideosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
