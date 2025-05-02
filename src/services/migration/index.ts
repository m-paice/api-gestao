import { join } from 'path';
import debug from 'debug';
import { lockResource } from '@nsfilho/redis-locker';
import { startMigration } from '@nsfilho/migration';

const logger = debug('services:migration');

logger('Starting migration');

lockResource({
    resourceName: 'gestao.api.migration',
    callback: () =>
        startMigration({
            migrationPath: join(__dirname, '..', '..', 'migrations'),
        }),
}).catch((error) => {
    logger('Error while trying to lock resource: %O', error);

    process.exit(1);
});
