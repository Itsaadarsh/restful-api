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
const product_1 = __importDefault(require("../models/product"));
const router = express_1.default.Router();
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const now = new Date().toISOString();
        const date = now.replace(/:/g, '-');
        cb(null, date + file.originalname);
    },
});
const upload = multer_1.default({ storage: storage });
router.get('/', (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const prod = yield product_1.default.find().select('name price _id');
        if (prod.length == 0) {
            res.status(404).json({ message: 'data not found' });
        }
        else {
            res.status(200).json({
                count: prod.length,
                products: prod,
            });
        }
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.post('/', upload.single('prodImage'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.sendFile(`${__dirname}/public/${req.file.filename}`);
}));
router.get('/:prodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    try {
        const prod = yield product_1.default.findById(prodID).select('name price _id');
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
router.patch('/:prodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    try {
        const updated = {};
        for (let i of req.body) {
            if (i.method == 'price') {
            }
            updated[i.method] = i.data;
        }
        yield product_1.default.updateOne({ _id: prodID }, { $set: updated });
        res.status(200).json({
            message: `PRODUCT ${prodID} updated`,
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message, error: err });
    }
}));
router.delete('/:prodId', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const prodID = req.params.prodId;
    try {
        const prod = yield product_1.default.deleteOne({ _id: prodID });
        if (prod.n == 1) {
            res.status(200).json({
                message: `PRODUCT ${prodID} deleted`,
            });
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