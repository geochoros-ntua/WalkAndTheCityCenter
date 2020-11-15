import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndexselectorComponent } from './indexselector.component';

describe('IndexselectorComponent', () => {
  let component: IndexselectorComponent;
  let fixture: ComponentFixture<IndexselectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndexselectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndexselectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
