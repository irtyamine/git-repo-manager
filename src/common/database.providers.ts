import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
          `mongodb://localhost:27017/repositories_versions` || process.env.MONGO_URL,
        { useNewUrlParser: true, useFindAndModify: false },
      ),
  }
];
