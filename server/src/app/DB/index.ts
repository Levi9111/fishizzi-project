import config from '../config';
import { USER_ROLE, UserStatus } from '../constants';
import { User } from '../modules/User/user.model';

const superUser = {
  // id: '0001',
  email: config.super_admin_email,
  password: config.super_admin_password,
  needsPasswordChange: false,
  role: USER_ROLE.superAdmin,
  status: UserStatus[0],
  isDeleted: false,
};

const seedSuperAdmin = async () => {
  const isSuperAdminExists = await User.findOne({
    role: USER_ROLE.superAdmin,
  });

  if (!isSuperAdminExists) {
    await User.create(superUser);
  }
};
export default seedSuperAdmin;