import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ZoominoutComponent } from './zoominout.component';

describe('ZoominoutComponent', () => {
  let component: ZoominoutComponent;
  let fixture: ComponentFixture<ZoominoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ZoominoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ZoominoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
