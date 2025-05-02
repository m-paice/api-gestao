import debug from 'debug';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { validateBodyForCreateUser } from './rules';
import { schemaValidationForCreateUser } from './schemas';
import { APIResponse } from '../../../services';
import * as model from '../model/db';
import { encryptPassword } from '../../../services/credentials';

const logger = debug('features:users:controller:admin');
const route = Router();

route.post('/', validateBodyForCreateUser, async (req, res) => {
    try {
        const { username, password, name, accountId } = req.body as z.infer<
            typeof schemaValidationForCreateUser
        >;

        const hash = await encryptPassword(password);
        const user = await model.createUser({
            name,
            username,
            password: hash,

            accountId,
        });

        res.status(201).json({
            code: 'gestao.api.user.login.success',
            message: 'User created successfully',
            transaction: nanoid(),
            data: user,
        } as APIResponse);
    } catch (error) {
        logger('Error in create user route:', error);
        res.status(500).json({
            code: 'gestao.api.user.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

export { route };
