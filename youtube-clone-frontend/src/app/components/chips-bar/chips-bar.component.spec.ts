import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsBarComponent } from './chips-bar.component';

describe('ChipsBarComponent', () => {
  let component: ChipsBarComponent;
  let fixture: ComponentFixture<ChipsBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChipsBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
