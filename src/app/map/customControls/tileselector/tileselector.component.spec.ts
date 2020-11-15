import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TileselectorComponent } from './tileselector.component';

describe('TileselectorComponent', () => {
  let component: TileselectorComponent;
  let fixture: ComponentFixture<TileselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TileselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TileselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
