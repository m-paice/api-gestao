import { z } from 'zod';
import { ObjectId } from '../../../services';

export const COLLECTION_USERS = 'users';

export const UserSchema = z.object({
    name: z.string().default(''),
    username: z.string().default(''),
    password: z.string().default(''),

    // relations
    accountId: z.string(),
});

export type User = z.infer<typeof UserSchema>;
export type UserDocument = User & { _id: ObjectId | string };
