import { Connection } from 'mongoose';
import { PackagesSchema } from './packages.schema';

export const packagesProviders = [
    {
        provide: 'PackagesModelToken',
        useFactory: (connection: Connection) =>
          connection.model('Packages', PackagesSchema),
        inject: ['DbConnectionToken'],
    }
];
