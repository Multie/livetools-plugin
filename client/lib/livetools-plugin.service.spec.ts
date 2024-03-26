import { TestBed } from '@angular/core/testing';

import { LivetoolsPluginService } from './livetools-plugin.service';

describe('LivetoolsPluginService', () => {
  let service: LivetoolsPluginService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LivetoolsPluginService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
