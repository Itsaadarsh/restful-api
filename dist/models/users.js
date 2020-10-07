"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    _id: mongoose_1.default.Schema.Types.ObjectId,
    email: {
        type: mongoose_1.default.Schema.Types.String,
        required: true,
        unique: true,
        match: /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/,
    },
    passward: { type: mongoose_1.default.Schema.Types.String, required: true },
});
const userModel = mongoose_1.default.model('users', userSchema);
exports.default = module.exports = userModel;
//# sourceMappingURL=users.js.map