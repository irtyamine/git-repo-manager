import { Connection } from 'mongoose';
import { ReposParentSchema } from './schemas/repos.parent.schema';

export const reposProviders = [
    {
        provide: 'RepoModelToken',
        useFactory: (connection: Connection) => connection.model('Repo', ReposParentSchema),
        inject: ['DbConnectionToken']
    }
];