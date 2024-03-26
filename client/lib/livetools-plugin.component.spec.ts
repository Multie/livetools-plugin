import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetoolsPluginComponent } from './livetools-plugin.component';

describe('LivetoolsPluginComponent', () => {
  let component: LivetoolsPluginComponent;
  let fixture: ComponentFixture<LivetoolsPluginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LivetoolsPluginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LivetoolsPluginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
