"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => {
    res.status(201).json({ message: 'Req recieved' });
});
exports.default = module.exports = router;
//# sourceMappingURL=user.js.map