import { NextFunction, Request, Response } from 'express';
import { nanoid } from 'nanoid';
import debug from 'debug';

import { verifyToken } from '../../../services/credentials';
import { APIResponse } from '../../../services';

const logger = debug('features:users:middleware:useToken');

export const useToken = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];

        if (!token) {
            res.status(401).json({
                code: 'gestao.api.token.missing',
                message: 'Token is missing',
                transaction: nanoid(),
            } as APIResponse);
            return;
        }

        const decoed = verifyToken(token) as {
            userId: string;
            accountId: string;
        };

        if (!decoed) {
            res.status(401).json({
                code: 'gestao.api.token.invalid',
                message: 'Token is invalid',
                transaction: nanoid(),
            } as APIResponse);
            return;
        }
        req.auth = {
            userId: decoed.userId,
            accountId: decoed.accountId,
        };

        next();
    } catch (error) {
        logger('Error in useToken middleware:', error);
        res.status(500).json({
            code: 'gestao.api.token.error',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
