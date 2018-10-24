import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepoInfoComponent } from './repo.info.component';

describe('Repo.InfoComponent', () => {
  let component: Repo.InfoComponent;
  let fixture: ComponentFixture<Repo.InfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Repo.InfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Repo.InfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
