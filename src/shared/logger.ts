// import { createLogger, format, transports } from "winston";
// import path from "path";
// const { combine, timestamp, label, printf, prettyPrint } = format;
// import DailyRotateFile from 'winston-daily-rotate-file';

// const myFormat = printf(({ level, message, label, timestamp }) => {
//   const date = new Date(timestamp);
//   const hour = date.getHours();
//   const minutes = date.getMinutes();
//   const seconds = date.getSeconds();
//   return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
// });

// const errorlogger = createLogger({
//   level: "error",
//   format: combine(
//     label({ label: "Authentication" }),
//     timestamp(),
//     myFormat,
//     prettyPrint()
//   ),
//   defaultMeta: { service: "user-service" },
//   transports: [
//     new transports.Console(),
//   //   new DailyRotateFile({
//   //     filename: path.join(process.cwd(), "logs", "winston","errors", "phu-error-%DATE%.log"),
//   //     datePattern: 'YYYY-MM-DD-HH',
//   //     zippedArchive: true,
//   //     maxSize: '20m',
//   //     maxFiles: '14d'
//   // })
//   ],
// });
// const logger = createLogger({
//   level: "info",
//   format: combine(
//     label({ label: "Authentication" }),
//     timestamp(),
//     myFormat,
//     prettyPrint()
//   ),
//   defaultMeta: { service: "user-service" },
//   transports: [
//     new transports.Console(),

//   //   new DailyRotateFile({
//   //     filename: path.join(process.cwd(), "logs", "winston","successes", "phu-success-%DATE%.log"),
//   //     datePattern: 'YYYY-MM-DD-HH',
//   //     zippedArchive: true,
//   //     maxSize: '20m',
//   //     maxFiles: '14d'
//   // })
//   ],
// });

// export { logger, errorlogger };
import { createLogger, format, transports } from "winston";

const { combine, timestamp, label, printf, prettyPrint } = format;

const myFormat = printf(({ level, message, label, timestamp }) => {
  const date = new Date(timestamp);
  const hour = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${date.toDateString()} ${hour}:${minutes}:${seconds} [${label}] ${level}: ${message}`;
});

const logger = createLogger({
  level: "info",
  format: combine(label({ label: "Authentication" }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: "user-service" },
  transports: [new transports.Console()], // Log only to console
});

const errorLogger = createLogger({
  level: "error",
  format: combine(label({ label: "Authentication" }), timestamp(), myFormat, prettyPrint()),
  defaultMeta: { service: "user-service" },
  transports: [new transports.Console()], // Log errors to console
});

export { logger, errorLogger };
