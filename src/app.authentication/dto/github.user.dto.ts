import { GithubUserInterface } from '../interfases/github.user.interface';

export class GithubUserDto implements GithubUserInterface{
  expiresDate: number;
  accessToken: string;
  authToken: string;
}