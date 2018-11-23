import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb://localhost/repositories_versions',
        { useNewUrlParser: true, useFindAndModify: false },
      ),
  },
];
