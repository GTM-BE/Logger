import Logger from '../src/Logger';
import LogProfile from '../src/LogProfile';
import LogLevel from '../src/Types/LogLevelEnum';

const logger = new Logger().enable({
    loglevel: LogLevel.INFO,
    logProfiles: [
        new LogProfile({ name: 'test', prefix: 'test', logLevel: LogLevel.INFO })
    ]
});

logger.log('test', 'Eine test nachricht für den logger');

logger.log('info', 'Eine test nachricht für den logger');
logger.log('warn', 'Eine test nachricht für den logger');
logger.log('error', 'Eine test nachricht für den logger');
logger.log('debug', 'Eine test nachricht für den logger');
