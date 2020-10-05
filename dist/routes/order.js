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
const router = express_1.default.Router();
router.get('/', (_req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        msg: 'GET Request Order',
    });
}));
router.post('/', (req, res, _next) => __awaiter(void 0, void 0, void 0, function* () {
    const order = {
        prodId: req.body.prodId,
        qty: +req.body.quantity,
    };
    res.status(201).json({
        msg: 'POST Request Order',
        order: order,
    });
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