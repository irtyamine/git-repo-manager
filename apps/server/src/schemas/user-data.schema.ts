import * as mongoose from 'mongoose';

export const UserDataSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  accessToken: {
    type: String,
    required: true
  },
  authToken: {
    type: String,
    required: true
  },
  expiresTime: {
    type: Number,
    required: true
  }
}, { versionKey: false });
