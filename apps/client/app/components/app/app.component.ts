import { Component, OnInit } from '@angular/core';
import { setTheme } from 'ngx-bootstrap';
import { Router } from '@angular/router';
import { AuthService } from '../../modules/user-authorization/services/auth.service';
import { LocalStorageService } from '../../shared/services/local-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(
    private readonly router: Router,
    private readonly auth: AuthService,
    private readonly lsService: LocalStorageService
  ) {
    setTheme('bs4');
  }

  ngOnInit(): void {
    const repository = this.lsService.getItem('repository');

    this.auth.check()
      .subscribe(result => {
        if (!result) {
          this.router.navigateByUrl('login');
        }
        else if (repository) {
          this.router.navigate(['repositories', repository]);
        }
        else {
          this.router.navigateByUrl('repositories');
        }
      });
  }
}
