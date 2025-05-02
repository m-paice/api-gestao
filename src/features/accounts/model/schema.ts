import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_ACCOUNTS = 'accounts';

export const AccountsSchema = z.object({
    name: z.string().default(''),
});

export type Account = z.infer<typeof AccountsSchema>;
export type AccountDocument = Account & { _id: ObjectId | string };
