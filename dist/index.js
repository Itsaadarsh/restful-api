"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const order_1 = __importDefault(require("./routes/order"));
const morgan_1 = __importDefault(require("morgan"));
const app = express_1.default();
app.use(morgan_1.default('dev'));
app.use('/product', products_1.default);
app.use('/orders', order_1.default);
app.listen(3000, () => {
    console.log('Listening at PORT 3000');
});
//# sourceMappingURL=index.js.map