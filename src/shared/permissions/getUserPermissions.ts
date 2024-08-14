import { defineAbilityFor } from './casl';
import { userSchema } from './models/user';
import { Roles } from './permissions';

interface IGetUserPermissions {
  userId?: string;
  role?: Roles;
}

export function getUserPermissions({ userId, role }: IGetUserPermissions) {
  const authUser = userSchema.parse({
    id: userId,
    role,
  });

  const ability = defineAbilityFor(authUser);

  return ability;
}
