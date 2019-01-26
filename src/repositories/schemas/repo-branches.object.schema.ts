import * as mongoose from 'mongoose';
import { RepoBranchSchema } from './repo.branch.schema';

export const RepoBranchesObjectSchema = new mongoose.Schema({
  master: RepoBranchSchema,
  development: RepoBranchSchema
}, { _id: false });
