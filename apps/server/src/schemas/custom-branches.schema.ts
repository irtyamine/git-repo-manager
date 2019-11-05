import * as mongoose from 'mongoose';

export const CustomBranchesSchema = new mongoose.Schema({
  repoName: {
    type: String,
    required: true
  },
  addedBy: {
    type: String,
    required: true
  },
  vcs: {
    type: String,
    required: true
  },
  customBranches: {
    type: Object,
    required: true
  }
}, { versionKey: false });
