import { COLLECTION_USERS, UserDocument, UserSchema } from './schema';

import { getDb } from '../../../services/mongo';
import type { CreateUserParams } from './types';

const users = () => getDb().collection<UserDocument>(COLLECTION_USERS);

// basic actions
export const createUser = async (payload: CreateUserParams) => {
    const user = UserSchema.parse(payload) as UserDocument;

    return users().insertOne(user);
};

export const findUserByUsername = async (username: string) =>
    users().findOne({ username });
