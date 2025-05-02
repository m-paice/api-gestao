import { MigrationParameters } from '@nsfilho/migration';
import { COLLECTION_USERS, UserSchema } from '../features/users/model/schema';
import { encryptPassword } from '../services/credentials';

/** Used to show during logs and inform what about this migration is. */
export const description = 'Initial migration';

export const up = async ({ db }: MigrationParameters): Promise<void> => {
    const hash = await encryptPassword('123456');

    const admin = UserSchema.parse({
        name: 'Studio Roane Rocha',
        username: 'roane.rocha',
        password: hash,
        accountId: '681372b1c9b0dd606014ee7d',
    });

    const userAlreadyExists = await db.collection(COLLECTION_USERS).findOne({
        username: admin.username,
    });

    if (userAlreadyExists) return;

    await db.collection(COLLECTION_USERS).insertOne(admin);
    await db
        .collection(COLLECTION_USERS)
        .createIndex({ username: 1 }, { unique: true });
};

export const down = async ({
    collections,
}: MigrationParameters): Promise<void> => {
    // a piece of code for down (not implemented yet!)
    if (collections.users) {
        await collections.users.drop();
    }
};
