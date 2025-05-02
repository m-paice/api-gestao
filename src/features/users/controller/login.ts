import debug from 'debug';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import { z } from 'zod';

import { validateBodyForLogin } from './rules';
import { schemaValidationForLogin } from './schemas';
import { APIResponse } from '../../../services';
import * as model from '../model/db';
import { createToken, validatePassword } from '../../../services/credentials';

const logger = debug('features:users:controller:login');
const route = Router();

route.post('/', validateBodyForLogin, async (req, res) => {
    try {
        const { username, password } = req.body as z.infer<
            typeof schemaValidationForLogin
        >;

        const user = await model.findUserByUsername(username);

        if (!user) {
            res.status(404).json({
                code: 'gestao.api.user.login.failed',
                message: 'User not found',
                transaction: nanoid(),
            } as APIResponse);

            return;
        }

        const checkPassword = await validatePassword(password, user.password);

        if (!checkPassword) {
            res.status(401).json({
                code: 'gestao.api.user.login.failed',
                message: 'User not found',
                transaction: nanoid(),
            } as APIResponse);

            return;
        }

        const token = createToken(user._id.toString(), user.accountId);

        res.status(200).json({
            code: 'gestao.api.user.login.success',
            message: 'Login successful',
            transaction: nanoid(),
            data: {
                token,
                user,
            },
        } as APIResponse);
    } catch (error) {
        logger('Error in login route:', error);
        res.status(500).json({
            code: 'gestao.api.user.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

export { route };
