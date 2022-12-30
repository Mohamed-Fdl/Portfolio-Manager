"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
//load env variable
dotenv_1.default.config();
// routes
const users_1 = __importDefault(require("./routes/users"));
const projects_1 = __importDefault(require("./routes/projects"));
//db connaction
//connection()
//serve static files at ./src/uploads
app.use('/file', express_1.default.static('./src/uploads'));
app.use(express_1.default.static('./src/public'));
//middlewares 
app.use(express_1.default.json());
// route app
app.use('/api/user', users_1.default);
app.use('/api/project', projects_1.default);
const PORT = process.env.NODE_ENV = "development" ? process.env.MY_PORT : process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Running here :  http://localhost:${PORT}`);
});
