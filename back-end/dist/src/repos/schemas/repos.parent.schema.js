"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const repos_child_schema_1 = require("./repos.child.schema");
exports.ReposParentSchema = new mongoose.Schema({
    repoName: {
        type: String,
        required: true
    },
    timestamp: {
        type: String,
        required: true
    },
    master: [repos_child_schema_1.ReposChildSchema][0],
    develop: [repos_child_schema_1.ReposChildSchema][0],
    development: [repos_child_schema_1.ReposChildSchema][0]
});
//# sourceMappingURL=repos.parent.schema.js.map