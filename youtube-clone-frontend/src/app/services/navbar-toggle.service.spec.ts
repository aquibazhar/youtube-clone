import { TestBed } from '@angular/core/testing';

import { NavbarToggleService } from './navbar-toggle.service';

describe('NavbarToggleService', () => {
  let service: NavbarToggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarToggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
