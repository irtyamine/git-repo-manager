import { Connection } from 'mongoose';
import { RepoSchema } from './schemas/repo.schema';

export const reposProviders = [
  {
    provide: 'RepoModelToken',
    useFactory: (connection: Connection) =>
      connection.model('Repo', RepoSchema),
    inject: ['DbConnectionToken'],
  },
];
