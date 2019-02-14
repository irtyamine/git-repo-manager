"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repo_branch_schema_1 = require("./repo.branch.schema");
exports.RepoBranchesObjectSchema = new mongoose.Schema({
    master: repo_branch_schema_1.RepoBranchSchema,
    development: repo_branch_schema_1.RepoBranchSchema
}, { _id: false });
//# sourceMappingURL=repo-branches.object.schema.js.map