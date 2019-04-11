import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `${ process.env.MONGO_URL || process.env.MONGO_URL_LOCAL }/repositories_versions`,
        { useNewUrlParser: true, useFindAndModify: false },
      ),
  }
];
