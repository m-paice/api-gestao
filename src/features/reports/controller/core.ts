import debug from 'debug';
import { Router } from 'express';
import { nanoid } from 'nanoid';
import dayjs from 'dayjs';
import { z } from 'zod';

import {
    validateBodyForCreateReport,
    validateQueryForFindTransactionsToYear,
} from './rules';
import { schemaValidationForCreateReport } from './schemas';
import { APIResponse } from '../../../services';
import * as model from '../model/db';
import { useToken } from '../../users/middleware/useToken';

const logger = debug('features:reports:controller:core');
const route = Router();

route.post('/', useToken, validateBodyForCreateReport, async (req, res) => {
    try {
        const { type, value, description, client } = req.body as z.infer<
            typeof schemaValidationForCreateReport
        >;
        const { accountId } = req.auth;

        const report = await model.createReport({
            type,
            value,
            description,
            client,

            when: dayjs().set('month', req.body.month).toDate(),
            accountId,
        });

        res.status(201).json({
            code: 'gestao.api.report.login.success',
            message: 'report created successfully',
            transaction: nanoid(),
            data: report,
        } as APIResponse);
    } catch (error) {
        logger('Error in create report route:', error);
        res.status(500).json({
            code: 'gestao.api.report.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

route.get(
    '/transactions',
    useToken,
    validateQueryForFindTransactionsToYear,
    async (req, res) => {
        const { year } = res.locals;

        try {
            const { accountId } = req.auth;

            const reports = await model.findTransactionsToYear({
                accountId,
                year: year || dayjs().year(),
            });

            res.status(200).json({
                code: 'gestao.api.report.login.success',
                message: 'report list successfully',
                transaction: nanoid(),
                data: reports,
            } as APIResponse);
        } catch (error) {
            logger('Error in list report route:', error);

            res.status(500).json({
                code: 'gestao.api.report.login.failed',
                message: 'Internal server error',
                transaction: nanoid(),
                args: error,
            } as APIResponse);
        }
    }
);

route.get('/transactions/:month', useToken, async (req, res) => {
    const { month } = req.params;

    try {
        const { accountId } = req.auth;

        const reports = await model.findTransactionByMonth({
            accountId,
            month: parseInt(month, 10),
        });

        res.status(200).json({
            code: 'gestao.api.report.login.success',
            message: 'report list successfully',
            transaction: nanoid(),
            data: reports,
        } as APIResponse);
    } catch (error) {
        logger('Error in list report route:', error);

        res.status(500).json({
            code: 'gestao.api.report.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

route.get('/lastTransactions', useToken, async (req, res) => {
    try {
        const { accountId } = req.auth;

        const reports = await model.findLastTransactions({
            accountId,
        });

        res.status(200).json({
            code: 'gestao.api.report.login.success',
            message: 'report list successfully',
            transaction: nanoid(),
            data: reports,
        } as APIResponse);
    } catch (error) {
        logger('Error in list report route:', error);

        res.status(500).json({
            code: 'gestao.api.report.login.failed',
            message: 'Internal server error',
            transaction: nanoid(),
            args: error,
        } as APIResponse);
    }
});

export { route };
