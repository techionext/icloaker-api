import { z } from 'zod';

export const SchemaUserValidatePasswordChange = z.object({
  id: z.string({
    required_error: 'id não encontrado !',
    invalid_type_error: 'Enviar id como string',
  }),
});
