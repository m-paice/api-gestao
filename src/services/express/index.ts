import os from 'os';
import debug from 'debug';
import express from 'express';
import dayjs from 'dayjs';
import { nanoid } from 'nanoid';
import cors from 'cors';
import { uniqueExecution } from '@nsfilho/unique';
import { EXPRESS_PORT, EXPRESS_START_DELAY } from '../../constants';
import { APIResponse, APIEcho } from './types';

import pkgJson from '../../../package.json';

const logger = debug('services:express');

const app = express();

// trust proxy
app.set('trust proxy', true);
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_req, res) => {
    res.status(200).json({
        code: 'echo',
        transaction: nanoid(),
        message: 'OK',
        args: [],
        data: {
            server: os.hostname(),
            time: dayjs().toISOString(),
            version: pkgJson.version,
        },
    } as APIResponse<APIEcho>);
});

uniqueExecution({
    name: __filename,
    callback: () => {
        // needs wait for rabbitmq connection
        app.listen(EXPRESS_PORT, () => {
            logger(`Server listening on port ${EXPRESS_PORT}`);
        });
    },
    advanced: {
        delay: EXPRESS_START_DELAY,
        blockExecution: false,
        priority: 100,
    },
});

export { app, APIResponse, APIEcho };
