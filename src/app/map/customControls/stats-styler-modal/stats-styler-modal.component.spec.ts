import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsStylerModalComponent } from './stats-styler-modal.component';

describe('StatsStylerModalComponent', () => {
  let component: StatsStylerModalComponent;
  let fixture: ComponentFixture<StatsStylerModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StatsStylerModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StatsStylerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
