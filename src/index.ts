/// <reference path="./@types/express.d.ts" />

import 'dotenv/config';
import debug from 'debug';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import './services';
import * as features from './features';
import { app } from './services/express';

dayjs.extend(utc);
dayjs.extend(timezone);

const logger = debug('core');

logger('Starting API');

// the unique point of code who knows about all features.
app.use(features.users.controller.router);
app.use(features.accounts.controller.router);
app.use(features.reports.controller.router);
