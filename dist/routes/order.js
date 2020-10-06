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
const orders_1 = __importDefault(require("../models/orders"));
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
router.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: 'GET Request Order',
    });
}));
router.post('/', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const productID = yield product_1.default.findById(req.body.prodId);
    if (productID) {
        try {
            const order = new orders_1.default({
                _id: new mongoose_1.default.Types.ObjectId(),
                prodId: productID._id,
                quantity: req.body.quantity,
            });
            const savedOrder = yield order.save();
            res.status(201).json({
                msg: 'Order saved',
                order: savedOrder,
            });
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message, error: err });
        }
    }
    else {
        res.status(404).json({ message: 'Data not found' });
    }
}));
router.get('/:orderID', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderID = req.params.orderID;
    res.status(200).json({
        msg: 'GET particular order',
        id: orderID,
    });
}));
router.delete('/:orderID', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const orderID = req.params.orderID;
    res.status(200).json({
        msg: 'DELETE particular order',
        id: orderID,
    });
}));
exports.default = module.exports = router;
//# sourceMappingURL=order.js.map