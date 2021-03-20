import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareMapModalComponent } from './share-map-modal.component';

describe('ShareMapModalComponent', () => {
  let component: ShareMapModalComponent;
  let fixture: ComponentFixture<ShareMapModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShareMapModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareMapModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
