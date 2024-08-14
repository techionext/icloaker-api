import { $Enums } from '@prisma/client';
import { z } from 'zod';

export const userSchema = z.object({
  __typename: z.literal('User').default('User'),
  id: z.string(),
  role: z.nativeEnum($Enums.userRole),
});

export type User = z.infer<typeof userSchema>;

export function userPermissions({ id, role }: Omit<User, '__typename'>) {
  const authUser = userSchema.parse({
    id,
    role,
  });

  return authUser;
}
