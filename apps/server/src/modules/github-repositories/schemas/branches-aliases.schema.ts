import * as mongoose from 'mongoose';

export const BranchesAliasesSchema = new mongoose.Schema({
  master: {
    type: Array,
    required: true
  },
  development: {
    type: Array,
    required: true
  }
}, { versionKey: false });
