import dayjs from 'dayjs';

import { getDb, ObjectId } from '../../../services/mongo';
import { COLLECTION_REPORTS, ReportDocument, ReportsSchema } from './schema';
import type {
    CreateReportParams,
    FindTransactionsToYear,
    FindLastTransactions,
    FindTransactionsToMonth,
} from './types';

const db = () => getDb().collection<ReportDocument>(COLLECTION_REPORTS);

// basic actions
export const createReport = async (payload: CreateReportParams) => {
    const data = ReportsSchema.parse(payload) as ReportDocument;

    return db().insertOne(data);
};

export const removeReport = async (id: string) =>
    db().deleteOne({ _id: new ObjectId(id) });

export const findTransactionByMonth = async (params: FindTransactionsToMonth) =>
    db()
        .aggregate([
            {
                $match: {
                    accountId: params.accountId,
                    when: {
                        $gte: dayjs()
                            .month(params.month)
                            .startOf('month')
                            .toDate(),
                        $lte: dayjs()
                            .month(params.month)
                            .endOf('month')
                            .toDate(),
                    },
                },
            },
        ])
        .toArray();

export const findTransactionsToYear = async (params: FindTransactionsToYear) =>
    db()
        .aggregate([
            {
                $match: {
                    accountId: params.accountId,
                    when: {
                        $gte: dayjs()
                            .year(params.year)
                            .startOf('year')
                            .toDate(),
                        $lte: dayjs().year(params.year).endOf('year').toDate(),
                    },
                },
            },
            // groud by month
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%m', date: '$when' },
                    },
                    in: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'in'] }, '$value', 0],
                        },
                    },
                    out: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'out'] }, '$value', 0],
                        },
                    },
                },
            },
        ])
        .toArray();

export const findLastTransactions = async (params: FindLastTransactions) =>
    db()
        .aggregate([
            {
                $match: {
                    accountId: params.accountId,
                    // last 6 months
                    when: {
                        $gte: dayjs().subtract(6, 'month').toDate(),
                        $lte: dayjs().toDate(),
                    },
                },
            },
            // groud by month
            {
                $group: {
                    _id: {
                        $dateToString: { format: '%m', date: '$when' },
                    },
                    in: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'in'] }, '$value', 0],
                        },
                    },
                    out: {
                        $sum: {
                            $cond: [{ $eq: ['$type', 'out'] }, '$value', 0],
                        },
                    },
                },
            },
        ])
        .toArray();
