"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res, _next) => {
    res.status(200).json({
        msg: 'GET Request Order',
    });
});
router.post('/', (_req, res, _next) => {
    res.status(201).json({
        msg: 'POST Request Order',
    });
});
router.get('/:orderID', (req, res, _next) => {
    const orderID = req.params.orderID;
    res.status(200).json({
        msg: 'GET particular order',
        id: orderID,
    });
});
router.delete('/:orderID', (req, res, _next) => {
    const orderID = req.params.orderID;
    res.status(200).json({
        msg: 'DELETE particular order',
        id: orderID,
    });
});
exports.default = module.exports = router;
//# sourceMappingURL=order.js.map