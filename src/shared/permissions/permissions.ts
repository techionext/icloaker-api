import { AbilityBuilder } from '@casl/ability';
import { $Enums } from '@prisma/client';

import { AppAbility } from '@shared/permissions/casl';

import { User } from './models/user';

export type Roles = $Enums.userRole;

type PermissionsByRole = (user: User, builder: AbilityBuilder<AppAbility>) => void;

export const permissions: Record<Roles, PermissionsByRole> = {
  ROOT: (user, { can }) => {
    can('manage', 'all');
  },
  ADMIN: (user, { can, cannot }) => {
    can('manage', 'all');

    can('create', 'User', { role: { $ne: 'ROOT' } });

    cannot(['update', 'delete'], ['User']);
    can(['update', 'delete'], 'User', { role: { $ne: 'ROOT' } });
  },
  COLLABORATOR: (user, { can, cannot }) => {
    can('manage', 'all');

    cannot(['create', 'invite', 'update', 'delete'], 'User');
    can('create', 'User', { role: { $eq: 'USER' } });
    can(['update', 'delete'], 'User', { id: { $eq: user.id } });
  },
  USER: () => {},
};
