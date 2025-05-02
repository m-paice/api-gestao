import { COLLECTION_ACCOUNTS, AccountDocument, AccountsSchema } from './schema';

import { getDb } from '../../../services/mongo';
import type { CreateAccountParams } from './types';

const db = () => getDb().collection<AccountDocument>(COLLECTION_ACCOUNTS);

// basic actions
export const createAccount = async (payload: CreateAccountParams) => {
    const account = AccountsSchema.parse(payload) as AccountDocument;

    return db().insertOne(account);
};
