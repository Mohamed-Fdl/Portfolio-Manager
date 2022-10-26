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
const dotenv_1 = __importDefault(require("dotenv"));
const user_js_1 = __importDefault(require("../models/user.js"));
//load env variables
dotenv_1.default.config();
//db connection
//dbConnect()
function create() {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_js_1.default.create({
            name: 'Fadel',
            firstname: 'ABOU',
            email: 'fadel@email.com',
            title: 'Backend Developer',
            description: 'je suis'
        });
        return user;
    });
}
create();
const app = (0, express_1.default)();
//middlewares 
app.use(express_1.default.json());
// routes importation
const users_1 = __importDefault(require("./routes/users"));
// route app
app.use('/user', users_1.default);
const PORT = process.env.NODE_ENV = "development" ? process.env.MY_PORT : process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server Running here :  http://localhost:${PORT}`);
});
