"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get('/', (_req, res, _next) => {
    res.status(200).json({
        msg: 'GET Request',
    });
});
;
router.post('/', (_req, res, _next) => {
    res.status(201).json({
        msg: 'POST Request',
    });
});
router.get('/:prodId', (req, res, _next) => {
    const prodID = req.params.prodId;
    res.status(200).json({
        msg: 'GET particular product',
        id: prodID,
    });
});
router.patch('/:prodId', (req, res, _next) => {
    const prodID = req.params.prodId;
    res.status(200).json({
        msg: 'UPDATE particular product',
        id: prodID,
    });
});
router.delete('/:prodId', (req, res, _next) => {
    const prodID = req.params.prodId;
    res.status(200).json({
        msg: 'DELETE particular product',
        id: prodID,
    });
});
exports.default = module.exports = router;
//# sourceMappingURL=products.js.map