import debug from 'debug';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { validateBodyForCreateAccount } from './rules';
import { schemaValidationForCreateAccount } from './schemas';
import { APIResponse } from '../../../services';
import * as model from '../model/db';

const logger = debug('features:accounts:controller:admin');
const route = Router();

route.post('/', validateBodyForCreateAccount, async (req, res) => {
    try {
        const { name } = req.body as z.infer<
            typeof schemaValidationForCreateAccount
        >;

        const account = await model.createAccount({
            name,
        });

        res.status(201).json({
            code: 'gestao.api.account.login.success',
            message: 'account created successfully',
            transaction: nanoid(),
            data: account,
        } as APIResponse);
    } catch (error) {
        logger('Error in create account route:', error);
        res.status(500).json({
            code: 'gestao.api.account.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

export { route };
