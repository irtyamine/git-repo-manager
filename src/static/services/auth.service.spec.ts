import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { HttpResponse } from '@angular/common/http';

describe('Service: AuthService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  describe('checkAuthTokenExists()', () => {
    it('should return value of boolean', (done: DoneFn) => {
      const authService = TestBed.get(AuthService);

      authService.checkAuthTokenExists().subscribe(result => {
        expect(result).toBeTruthy();
        done();
      });
      httpMock.expectOne(`${authService.API_URL}/repositories2/isAuthenticated`)
        .event(new HttpResponse<boolean>({ body: true }));
    });
  });

});