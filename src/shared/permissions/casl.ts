import { AbilityBuilder, CreateAbility, createMongoAbility, MongoAbility } from '@casl/ability';
import { z } from 'zod';

import { permissions } from '@shared/permissions/permissions';
import { userSubject } from '@shared/permissions/subjects/user';
import { AppError } from '@shared/Util/AppError/AppError';

import { User } from './models/user';

const AppAbilitiesSchema = z.union([userSubject, z.tuple([z.literal('manage'), z.literal('all')])]);

type AppAbilities = z.infer<typeof AppAbilitiesSchema>;

export type AppAbility = MongoAbility<AppAbilities>;
export const createAppAbility = createMongoAbility as CreateAbility<AppAbility>;

export function defineAbilityFor(user: User) {
  const builder = new AbilityBuilder(createAppAbility);

  if (typeof permissions[user.role] !== 'function') {
    throw new AppError('Permissões não encontradas.');
  }

  permissions[user.role](user, builder);

  const ability = builder.build({
    detectSubjectType(subject) {
      return subject.__typename;
    },
  });

  ability.can = ability.can.bind(ability);
  ability.cannot = ability.cannot.bind(ability);

  return ability;
}
