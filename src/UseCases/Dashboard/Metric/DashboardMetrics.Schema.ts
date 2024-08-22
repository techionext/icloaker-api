import { z } from 'zod';

import { handleVerifyDateFormat } from '@shared/features/handleVerifyDateFormat/handleVerifyDateFormat';

export const DashboardMetricsSchema = z
  .object({
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
  })
  .superRefine((data, error) => {
    if (data.startDate > data.endDate) error.addIssue({ code: 'custom', message: 'startDate deve ser menor que endDate' });
  });
