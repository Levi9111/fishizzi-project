"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = __importDefault(require("./app/config"));
const DB_1 = __importDefault(require("./app/DB"));
const app_1 = __importDefault(require("./app"));
async function main() {
    try {
        const connection = await mongoose_1.default.connect(config_1.default.database_url);
        if (connection) {
            console.log('Database connection established');
        }
        else {
            console.log('DB connection failed');
        }
        (0, DB_1.default)();
        app_1.default.listen(config_1.default.port, () => {
            console.log(`app listening on port ${config_1.default.port}`);
        });
    }
    catch (error) {
        console.log(error);
    }
}
main();
