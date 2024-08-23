import { z } from 'zod';

import { handleVerifyDateFormat } from '@shared/features/handleVerifyDateFormat/handleVerifyDateFormat';

export const DashboardCampaignMetricCountrySchema = z.object({
  startDate: z.coerce
    .date({ invalid_type_error: 'startDate com formato invalido, deve ser yyyy-mm-dd' })
    .transform((data) => data.toISOString().split('T')[0])
    .superRefine((data, error) => {
      if (!handleVerifyDateFormat(data)) error.addIssue({ code: 'custom', message: 'startDate deve seguir o padrão yyyy-mm-dd' });
    }),

  endDate: z.coerce
    .date({ invalid_type_error: 'endDate com formato invalido, deve ser yyyy-mm-dd' })
    .transform((data) => data.toISOString().split('T')[0])
    .superRefine((data, error) => {
      if (!handleVerifyDateFormat(data)) error.addIssue({ code: 'custom', message: 'endDate deve seguir o padrão yyyy-mm-dd' });
    }),

  campaignId: z.string({
    required_error: 'enviar campo campaignId',
    invalid_type_error: 'enviar campo campaignId como string',
  }),

  countryCode: z
    .string({ required_error: 'enviar campo countryCode', invalid_type_error: 'enviar campo countryCode como string' })
    .trim()
    .toUpperCase()
    .min(3, { message: 'enviar countryCode com no mínimo 3 letras' })
    .max(3, { message: 'enviar countryCode com no máximo 3 letras' }),

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
