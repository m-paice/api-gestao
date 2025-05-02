import { nanoid } from 'nanoid';
import { NextFunction, Request, Response } from 'express';
import { APIResponse } from '../../../services';
import {
    schemaValidationForCreateReport,
    schemaValidationForFindTransactionsToYear,
} from './schemas';

export const validateBodyForCreateReport = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'POST') {
        res.status(405).json({
            code: 'gestao.api.reports.validateBodyForCreateReport.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        req.body = schemaValidationForCreateReport.parse(req.body);

        next();
    } catch (error) {
        res.status(400).json({
            code: 'gestao.api.reports.validateBodyForCreateReport.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};

export const validateQueryForFindTransactionsToYear = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    if (req.method !== 'GET') {
        res.status(405).json({
            code: 'gestao.api.reports.validateQueryForFindTransactionsToYear.failed',
            message: '',
            transaction: nanoid(),
        } as APIResponse);

        return;
    }

    try {
        schemaValidationForFindTransactionsToYear.parse(req.query);

        res.locals = {
            year: parseInt(req.query.year as string, 10),
        };

        next();
    } catch (error) {
        res.status(400).json({
            code: 'gestao.api.reports.validateQueryForFindTransactionsToYear.failed',
            message: '',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
};
