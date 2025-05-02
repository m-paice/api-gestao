import dayjs from 'dayjs';
import { z } from 'zod';

export const schemaValidationForCreateReport = z.object({
    type: z.enum(['out', 'in']),
    value: z.number(),
    description: z.string().optional(),
    client: z.string().optional(),
    month: z.number().max(11).min(0).default(dayjs().month()),
});

export const schemaValidationForFindTransactionsToYear = z.object({
    year: z.string().optional(),
});
