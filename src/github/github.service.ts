import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HttpService } from '@nestjs/common';
import { toBase64String } from '@angular/compiler/src/output/source_map';

@Injectable()
export class GithubService  {
  private SERVER_URL = 'https://api.github.com';
  private login: any;
  private passw: any;

  constructor(private http: HttpService) {  }

  public getUser() {
    const config = {
      heads: {
        'Authorization': `Basic TmlraXRhR2x1a2hpOk5pa2l0YTA2MDIxODg4`,
        'Content-Type': 'application/json; charset=utf-8',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36',
      }
    };

    console.log();
    return this.http
      .get(`https://api.github.com/authorizations`, { headers: config.heads })
      .toPromise()
      .then( res => {
        return res.data;
      })
      .catch(err => {
        console.log(err.response.data);
      });
  }

  public createUser(data) {
    const requestBody = {
      'scopes': [
        'repo'
      ],
      'note': 'get private repositories',
    };
    this.login = data.login;
    this.passw = data.password;
    const headers = {
      'Authorization': `Basic ${toBase64String(`${data.login}:${data.password}`)}`,
     };

    return this.http.post(`${this.SERVER_URL}/authorizations`, requestBody, { headers: headers })
      .toPromise()
      .then(res => {
        console.log(res.data);
        return res.data;
      })
      .catch(err => {
        console.log(err.response);
        if(err.response.status === 401) {
          throw new UnauthorizedException(err === '401');
        }
      });
  }
}