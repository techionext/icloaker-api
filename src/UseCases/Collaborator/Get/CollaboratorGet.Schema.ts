import { z } from 'zod';

export const CollaboratorGetSchema = z.object({
  page: z.coerce
    .number({
      required_error: 'page não enviado !',
      invalid_type_error: 'enviar page como número !',
    })
    .int()
    .positive()
    .optional()
    .default(1),

  pageSize: z.coerce
    .number({
      required_error: 'pageSize não enviado !',
      invalid_type_error: 'enviar pageSize como número !',
    })
    .int()
    .positive()
    .optional()
    .default(10),

  filter: z
    .string({
      required_error: 'filter não enviado !',
      invalid_type_error: 'enviar filter como string !',
    })
    .optional(),

  token: z.object(
    {
      id: z.string({
        required_error: 'id token não encontrado !',
      }),

      email: z
        .string({
          required_error: 'email token não encontrado !',
        })
        .nullable(),
    },
    { required_error: 'token não enviado !' },
  ),
});
