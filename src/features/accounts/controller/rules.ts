import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../../../services';
import { schemaValidationForCreateAccount } from './schemas';

export const validateBodyForCreateAccount = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'gestao.api.user.validateBodyForCreateAccount.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaValidationForCreateAccount.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({
            code: 'gestao.api.user.validateBodyForCreateAccount.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
