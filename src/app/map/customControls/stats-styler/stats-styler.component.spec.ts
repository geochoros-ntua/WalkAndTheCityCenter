import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsStylerComponent } from './stats-styler.component';

describe('StatsStylerComponent', () => {
  let component: StatsStylerComponent;
  let fixture: ComponentFixture<StatsStylerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsStylerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsStylerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
