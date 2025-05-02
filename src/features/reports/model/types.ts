export interface CreateReportParams {
    type: string;
    value: number;
    description?: string;
    client?: string;
    when: Date;

    accountId: string;
}

export interface FindLastTransactions {
    accountId: string;
}

export interface FindTransactionsToYear {
    accountId: string;
    year: number;
}

export interface FindTransactionsToMonth {
    accountId: string;
    month: number;
}
