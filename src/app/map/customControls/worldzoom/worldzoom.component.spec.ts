import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorldzoomComponent } from './worldzoom.component';

describe('WorldzoomComponent', () => {
  let component: WorldzoomComponent;
  let fixture: ComponentFixture<WorldzoomComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorldzoomComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorldzoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
