import * as mongoose from 'mongoose';

export const GithubUserSchema = new mongoose.Schema({
  expiresDate: {
    type: Number,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  }
});