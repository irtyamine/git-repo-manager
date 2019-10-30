import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `${process.env.DB_URL}/repositories`,
        { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true },
        err => {
          if (err) {
            throw err;
          }
        }
      )
  }
];
