import * as mongoose from 'mongoose';

export const OrganizationsListSchema = new mongoose.Schema({
  organizationName: {
    type: String,
    required: true
  },
  organizationDataStorage: {
    type: String,
    required: true
  },
  organizationAccessToken: {
    type: String,
    required: true
  },
}, { versionKey: false, _id: false });

