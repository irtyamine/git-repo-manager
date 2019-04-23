import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GithubAuthComponent } from './auth';
import { AuthService } from '../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Component: GithubAuthComponent', () => {
  let component: GithubAuthComponent;
  let fixture: ComponentFixture<GithubAuthComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ GithubAuthComponent ],
      imports: [ HttpClientTestingModule ],
      providers: [ AuthService ]
    }).compileComponents();

    fixture = TestBed.createComponent(GithubAuthComponent);
  });

  it('should have tag <p> with "Well come!" value', (done: DoneFn) => {
    const bannerElement: HTMLElement = fixture.nativeElement,
      p = bannerElement.querySelector('p');

    expect(p.textContent).toEqual('Well Come!');
    done();
  });

  it('should have tag <i> with Font Awesome image(fa-github)', (done: DoneFn) => {
    const bannerElement: HTMLElement = fixture.nativeElement,
      i = bannerElement.querySelector('i');

    expect(i.className).toEqual('fab fa-github fa-2x img-pos');
    done();
  });

  it('should have tag <a> with "Login via Github" value while condition is true', (done: DoneFn) => {
    component = fixture.componentInstance;
    fixture.detectChanges();
    const bannerElement: HTMLElement = fixture.nativeElement,
      a = bannerElement.querySelector('a');

    expect(component.condition).toBeTruthy();
    expect(a.textContent).toEqual('Login via Github');
    done();
  });

  it('should have [disabled] attribute with value of false', (done: DoneFn) => {
    const bannerElement: HTMLElement = fixture.nativeElement,
      button = bannerElement.querySelector('button');

    expect(button.hasAttribute('disabled')).toBeFalsy();
    done();
  });
});
