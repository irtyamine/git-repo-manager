import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValorProjectsComponent } from './valor-projects.component';

describe('ValorProjectsComponent', () => {
  let component: ValorProjectsComponent;
  let fixture: ComponentFixture<ValorProjectsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValorProjectsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValorProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
