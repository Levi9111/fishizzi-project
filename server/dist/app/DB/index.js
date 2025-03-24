"use strict";
// import config from '../config';
// import { USER_ROLE, UserStatus } from '../constants';
// import { User } from '../modules/Customer/user.model';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// const superUser = {
//   // id: '0001',
//   email: config.super_admin_email,
//   password: config.super_admin_password,
//   needsPasswordChange: false,
//   role: USER_ROLE.superAdmin,
//   status: UserStatus[0],
//   isDeleted: false,
// };
// const seedSuperAdmin = async () => {
//   const isSuperAdminExists = await User.findOne({
//     role: USER_ROLE.superAdmin,
//   });
//   if (!isSuperAdminExists) {
//     await User.create(superUser);
//   }
// };
// export default seedSuperAdmin;
const seedSuperAdmin = () => __awaiter(void 0, void 0, void 0, function* () { });
exports.default = seedSuperAdmin;
