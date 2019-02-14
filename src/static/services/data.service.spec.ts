import { TestBed, async } from '@angular/core/testing';
import { Page } from '../page/page';

describe('AppComponent', () => {
  console.log('_______________________________________')
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        Page
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(Page);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});