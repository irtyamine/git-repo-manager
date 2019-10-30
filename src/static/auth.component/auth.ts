import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-github-auth',
  templateUrl: './auth.html',
  styleUrls: ['./auth.css']
})

export class GithubAuthComponent implements OnInit {
  public text: string = 'Login via Github';
  public condition: boolean = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  public goToGithubAuth() {
    this.condition = false;
    this.text = 'Loading...';
    window.location.href = `${environment.url}/repositories2/github`;
  }
}
