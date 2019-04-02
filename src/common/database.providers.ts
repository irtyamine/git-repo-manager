import * as mongoose from 'mongoose';

const MONGO_URL = 'mongodb://localhost';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `${MONGO_URL}/repositories_versions`,
        { useNewUrlParser: true, useFindAndModify: false },
      ),
  }
];
