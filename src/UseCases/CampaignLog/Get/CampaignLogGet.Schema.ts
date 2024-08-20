import { z } from 'zod';

export const CampaignLogGetSchema = z.object({
  campaignId: z.string({ required_error: 'enviar campo campaignId', invalid_type_error: 'enviar campo campaignId como string' }).trim(),

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
