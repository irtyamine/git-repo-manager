import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CronJob } from 'cron';

@Component({
  selector: 'app-component',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  public errorCondition: boolean = true;
  public errorAlert: string;

  constructor(private router: Router, private auth: AuthService) {}

  ngOnInit() {
    this.authentication();
    // NIGHT
    new CronJob('00 00 00 * * *', () => {
      this.authentication();
    }, null, true, 'Europe/Kiev');

    // MORNING
    new CronJob('00 00 06 * * *', () => {
      this.authentication();
    }, null, true, 'Europe/Kiev');

    // AFTERNOON
    new CronJob('00 00 12 * * *', () => {
      this.authentication();
    }, null, true, 'Europe/Kiev');

    // EVENING
    new CronJob('00 00 18 * * *', () => {
      this.authentication();
    }, null, true, 'Europe/Kiev');
  }

  public authentication() {
    this.auth.checkAuthTokenExists().subscribe(res => {
      if (!res) {
        this.router.navigateByUrl('/login');
      } else {
        this.router.navigateByUrl('/table-repositories');
      }
    }, err => {
      if (err.indexOf('401 Unauthorized', 0) >= 0) {
        this.router.navigateByUrl('/login');
        this.errorCondition = false;
        this.errorAlert = 'Oops! Something went wrong during authentication process or auth token expired';
      }
    });
  }
}