import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: 'DbConnectionToken',
    useFactory: async (): Promise<typeof mongoose> =>
      await mongoose.connect(
        'mongodb://localhost:27017/repositories_versions?connectTimeoutMS=30000' || `${process.env.MONGO_URL}?connectTimeoutMS=30000`,
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
