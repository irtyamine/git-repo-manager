import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-github-auth',
  templateUrl: './github.auth.html',
  styleUrls: ['./github.auth.css']
})

export class GithubAuthComponent implements OnInit {
  public text: string = 'Login via Github';
  public condition: boolean = true;

  constructor(private auth: AuthService) {}

  ngOnInit() {}

  public goToGithubAuth() {
    this.condition = false;
    this.text = 'Loading...';
    this.auth.gitLogin();
  }
}
