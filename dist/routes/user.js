"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express_1 = __importDefault(require("express"));
const users_1 = __importDefault(require("../models/users"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const router = express_1.default.Router();
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.find({ email: req.body.email });
    if (user.length == 0) {
        bcrypt_1.default.hash(req.body.passward, 10, (err, hash) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                if (!err) {
                    const user = new users_1.default({
                        _id: new mongoose_1.default.Types.ObjectId(),
                        email: req.body.email,
                        passward: hash,
                    });
                    req.user = hash;
                    console.log(req.user);
                    const createdUser = yield user.save();
                    res.status(201).json(createdUser);
                }
                else {
                    res.status(409).json({ message: 'Hash error', error: err });
                }
            }
            catch (err) {
                console.log(err);
                res.status(500).json({ message: err.message, error: err });
            }
        }));
    }
    else {
        res.status(409).json({ message: 'This email already exists' });
    }
}));
router.delete('/:userId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const deletedUser = yield users_1.default.deleteOne({ _id: req.params.userId });
        if (deletedUser.n == 1) {
            res.status(200).json({ message: `USER ${req.params.userId} deleted successfully` });
        }
        else {
            res.status(404).json({ message: `USER not found` });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
exports.default = module.exports = router;
//# sourceMappingURL=user.js.map