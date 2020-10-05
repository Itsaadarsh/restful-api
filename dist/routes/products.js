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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
router.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = yield product_1.default.find();
        if (prod.length == 0) {
            res.status(404).json({ message: 'data not found' });
        }
        else {
            res.status(200).json(prod);
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.post('/', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const product = new product_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: req.body.name,
        price: +req.body.price,
    });
    try {
        const prod = yield product.save();
        res.status(201).json(prod);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.get('/:prodId', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    try {
        const prod = yield product_1.default.findById(prodID);
        if (prod) {
            res.status(200).json(prod);
        }
        else {
            res.status(404).json({ message: 'data not found' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.patch('/:prodId', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    res.status(200).json({
        msg: 'UPDATE particular product',
        id: prodID,
    });
}));
router.delete('/:prodId', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    try {
        const prod = yield product_1.default.deleteOne({ _id: prodID });
        if (prod.n == 1) {
            res.status(200).json(prod);
        }
        else {
            res.status(404).json({ message: 'data not found' });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
exports.default = module.exports = router;
//# sourceMappingURL=products.js.map