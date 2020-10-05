"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("./routes/products"));
const order_1 = __importDefault(require("./routes/order"));
const morgan_1 = __importDefault(require("morgan"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const app = express_1.default();
mongoose_1.default.connect(`mongodb+srv://aadi:${process.env.MONGO_PWD}@cluster0.b7dxw.mongodb.net/restapi?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true });
app.use(morgan_1.default('dev'));
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    if (req.method == 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT,POST,DELETE,PATCH');
        return res.status(200).json({});
    }
    next();
    return;
});
app.use('/product', products_1.default);
app.use('/orders', order_1.default);
app.use((_req, _res, next) => {
    const err = new Error();
    err.message = 'Not found';
    err.status = 404;
    next(err);
});
app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message,
        },
    });
});
app.listen(3000, () => {
    console.log('Listening at PORT 3000');
});
//# sourceMappingURL=index.js.map