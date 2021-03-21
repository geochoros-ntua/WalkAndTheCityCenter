import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareChartModalComponent } from './share-chart-modal.component';

describe('ShareMapModalComponent', () => {
  let component: ShareChartModalComponent;
  let fixture: ComponentFixture<ShareChartModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareChartModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareChartModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
