import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-github-auth',
  templateUrl: './github.auth.html',
  styleUrls: ['./github.auth.css']
})

export class GithubAuthComponent implements OnInit {
  public condition: boolean = true;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {}


  public goToGithubAuth() {
    this.condition = false;
    this.auth.gitLogin();
  }

}