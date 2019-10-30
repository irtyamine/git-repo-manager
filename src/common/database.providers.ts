import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        `${process.env.MONGO_URL}?connectTimeoutMS=30000`,
        { useNewUrlParser: true, useFindAndModify: false },
        err => {
          if(!err) {}
          else {
              console.log(err);
            }
          }
      ),
  }
];
