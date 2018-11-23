"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repos_child_schema_1 = require("./repos.child.schema");
exports.ReposParentSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: false
    },
    timestamp: {
        type: Number,
        required: false
    },
    repoType: {
        type: String,
        required: false
    },
    master: repos_child_schema_1.ReposChildSchema,
    develop: repos_child_schema_1.ReposChildSchema,
    development: repos_child_schema_1.ReposChildSchema
});
//# sourceMappingURL=repos.parent.schema.js.map