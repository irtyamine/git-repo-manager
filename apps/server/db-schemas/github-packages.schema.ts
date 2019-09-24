import * as mongoose from 'mongoose';

export const PackgesSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  recommendVersion: {
    type: String,
    required: false
  },
  addedBy: {
    type: String,
    required: true
  },
  organization: {
    type: String,
    required: true
  },
  dataSource: {
    type: String,
    required: true
  },
  isImportant: {
    type: Boolean,
    required: true
  }
}, { versionKey: false });

