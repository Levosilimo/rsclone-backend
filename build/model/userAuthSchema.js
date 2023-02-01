"use strict";
exports.__esModule = true;
exports.schema = void 0;
var mongoose_1 = require("mongoose");
var UserAuthSchema = new mongoose_1.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true }
});
var model = mongoose_1["default"].model("User", UserAuthSchema);
exports.schema = model.schema;
exports["default"] = model;
//# sourceMappingURL=userAuthSchema.js.map