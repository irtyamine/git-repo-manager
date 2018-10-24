import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Not.FoundComponent } from './not.found.component';

describe('Not.FoundComponent', () => {
  let component: Not.FoundComponent;
  let fixture: ComponentFixture<Not.FoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Not.FoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Not.FoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
