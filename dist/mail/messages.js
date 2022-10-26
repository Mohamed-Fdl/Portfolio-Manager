"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegisterMail = void 0;
let userRegisterMail = (name, title) => {
    return {
        subject: 'Thanks for registring!!',
        html: '<p>Congrats Mr/Mme ' + name + ' for your registration.We wish you good luck for your job of ' + title + ' </p>'
    };
};
exports.userRegisterMail = userRegisterMail;
