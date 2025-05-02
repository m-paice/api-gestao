import { z } from 'zod';

export const schemaValidationForLogin = z.object({
    username: z
        .string()
        .min(1, { message: 'Username is required' })
        .toLowerCase(),
    password: z.string().min(1, { message: 'Password is required' }),
});

export const schemaValidationForCreateUser = z.object({
    name: z.string().min(1, { message: 'Name is required' }),
    username: z.string().min(1, { message: 'Username is required' }),
    password: z.string().min(1, { message: 'Password is required' }),
    accountId: z.string(),
});
