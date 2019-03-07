import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-github-auth',
  templateUrl: './github.auth.html',
  styleUrls: ['./github.auth.css']
})

export class GithubAuthComponent implements OnInit {
  public condition: boolean = false;
  public errorText: string;
  public loading: boolean = true;
  public errorAlertCondition: boolean = true;
  private keyUp = new Subject<any>();

  constructor(private router: Router, private auth: AuthService) {
    this.keyUp
      .pipe(
        map(event => {
          const login = event.login;
          const password = event.password;
          return { login, password };
        }),
        debounceTime(100),
        distinctUntilChanged()
      ).subscribe(text => {
      this.isEmpty(text.login, text.password);
    });
  }

  ngOnInit() {
    this.isEmpty('', '');
  }

  public checkInputValue(loginValue, passwordValue) {
    this.keyUp.next({ login: loginValue, password: passwordValue });
  }

  public logIn(login, password) {
    this.errorAlertCondition = true;
    this.loading = false;
    this.condition = false;
    this.auth.logIn({ login, password }).subscribe(res => {
      this.router.navigate(['/table-repositories']);
    }, err => {
      if (err.indexOf('401 Unauthorized', 0) >= 0) {
        this.errorText = 'Invalid login or password';
        this.errorAlertCondition = false;
        this.condition = true;
        this.loading = true;
      } else {
        return true;
      }
    });
  }

  public logOut() {
    this.auth.githubAuthentication().subscribe(res => {
      console.log(res);
    });
  }

  private isEmpty(valueOfLogin: string, valueOfPassword: string) {
    if (valueOfLogin.length === 0 || valueOfPassword.length === 0) {
      this.condition = false;
    } else {
      this.condition = true;
    }
  }
}