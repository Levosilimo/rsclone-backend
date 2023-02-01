"use strict";
exports.__esModule = true;
exports.schema = void 0;
var mongoose_1 = require("mongoose");
var mongodb_1 = require("mongodb");
var UserDataSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    levelFlexbox: { type: Number, required: true, "default": 1 },
    language: { type: String, required: true, "default": "en-us" },
    avatarId: {
        type: mongodb_1.ObjectId,
        required: true,
        "default": "63d663c156bef39ec55d01ae"
    }
});
var model = mongoose_1["default"].model("UserData", UserDataSchema);
exports.schema = model.schema;
exports["default"] = model;
//# sourceMappingURL=userDataSchema.js.map