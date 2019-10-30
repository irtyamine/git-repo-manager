import * as mongoose from 'mongoose';

export const RepoBranchesObjectSchema = new mongoose.Schema({
  master: {},
  development: {}
}, { _id: false });
