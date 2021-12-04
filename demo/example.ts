import { Logger } from '../src/Index';
import { Colors } from '../src/Types/Colors';

enum LogLevel {
  Debug,
  Error,
  Info
}

enum LogType {
  Debug = 'debug',
  Info = 'info',
  Warn = 'warn',
  Error = 'error'
}

const logger = new Logger({
  logLevel: LogLevel.Info,
  logProfiles: [
    {
      name: LogType.Debug,
      prefix: 'Debug',
      logLevel: LogLevel.Debug,
      prefixColor: Colors.BLUE,
      suffixColor: Colors.RED
    },
    {
      name: LogType.Info,
      prefix: 'Info',
      logLevel: LogLevel.Info
    },
    {
      name: LogType.Warn,
      prefix: 'Warn',
      logLevel: LogLevel.Error
    },
    {
      name: LogType.Error,
      prefix: 'Error',
      logLevel: LogLevel.Error
    }
  ]
});

logger.log(LogType.Info, 'This is a info message');
logger.log(LogType.Warn, 'This is a warn message');
logger.log(LogType.Error, 'This is a error message');
logger.log(LogType.Debug, 'This is a debug message');
