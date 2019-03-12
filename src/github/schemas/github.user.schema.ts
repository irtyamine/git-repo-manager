import * as mongoose from 'mongoose';

export const GithubUserSchema = new mongoose.Schema({
  login: String,
  loginData: String,
  tokenId: Number,
  token: String,
  authToken: String
}, { _id: false });