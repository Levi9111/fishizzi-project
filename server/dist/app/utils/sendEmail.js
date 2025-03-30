"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendEmail = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const config_1 = __importDefault(require("../config"));
const sendEmail = async (to, html) => {
    const transporter = nodemailer_1.default.createTransport({
        host: 'stmp.gmail.com',
        port: 587,
        secure: config_1.default.NODE_ENV === 'production',
        auth: {
            user: 'captainlevi9111@gmail.com',
            pass: 'ohxz zaug rlgn kewr',
        },
    });
    await transporter.sendMail({
        from: 'captainlevi9111.gmail.com',
        to,
        subject: 'Forgot your password?',
        text: 'Reset your password',
        html,
    });
};
exports.sendEmail = sendEmail;
