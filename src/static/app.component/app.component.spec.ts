import { ComponentFixture, fakeAsync, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

describe('Component: AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let httpMock: HttpTestingController;
  let mockRouter = {
    navigate: jasmine.createSpy('navigate')
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ AppComponent ],
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      providers: [
        AuthService,
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should have an attribute [hidden] with value of true', (done: DoneFn) => {
    component = fixture.componentInstance;
    fixture.detectChanges();

    const bannerElement: HTMLElement = fixture.nativeElement,
      div = bannerElement.querySelector('div');

    expect(div.hasAttribute('hidden')).toBeTruthy();
    done();
  });

  describe('checkForAuthentication()', () => {
    it('should navigate to login page', (done: DoneFn) => {
      component = fixture.componentInstance;
      const authService = TestBed.get(AuthService);

      component.checkForAuthentication();
      httpMock.expectOne(`${authService.API_URL}/repositories2/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: false }));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/login']);
      done();
    });

    it('should navigate to page with data', (done: DoneFn) => {
      component = fixture.componentInstance;
      const authService = TestBed.get(AuthService);

      component.checkForAuthentication();
      httpMock.expectOne(`${authService.API_URL}/repositories2/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: true }));
      expect(mockRouter.navigate).toHaveBeenCalledWith(['/table-repositories']);
      done();
    });
  });
});