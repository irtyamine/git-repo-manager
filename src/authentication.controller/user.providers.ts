import { Connection } from 'mongoose';
import { GithubUserSchema } from './schemas/github.user.schema';

export const githubUserProviders = [
  {
    provide: 'GithubUsersModelToken',
    useFactory: (connection: Connection) =>
      connection.model('GithubUsers', GithubUserSchema),
    inject: ['DbConnectionToken']
  }
];
