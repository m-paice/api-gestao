import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_REPORTS = 'reports';

export const ReportsSchema = z.object({
    type: z.enum(['out', 'in']),
    value: z.number(),
    description: z.string().optional(),
    client: z.string().optional(),
    when: z.date(),

    // relations
    accountId: z.string(),
});

export type Report = z.infer<typeof ReportsSchema>;
export type ReportDocument = Report & { _id: ObjectId | string };
