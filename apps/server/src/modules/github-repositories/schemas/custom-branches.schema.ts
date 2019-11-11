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
  organization: {
    type: String,
    required: true
  },
  vcs: {
    type: String,
    required: true
  },
  branches: {
    baseBranch: {
      type: Object,
      required: true
    },
    compareBranch: {
      type: Object,
      required: true
    }
  }
}, { versionKey: false });
