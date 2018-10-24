import { connection, Connection } from 'mongoose';
import { RepoDataSchema } from '../schemas/repo.data.schema';

export const repoProviders = [
    {
        provide: 'RepoModelToken',
        useFactory: (connection: Connection) => connection.model('Repo', RepoDataSchema),
        inject: ['DbConnectionToken']
    }
];