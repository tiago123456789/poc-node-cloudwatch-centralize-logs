const winston = require("winston");
const WinstonCloudWatch = require("winston-cloudwatch");
const moment = require("moment");

const AWS_LOG_GROUP =  process.env.AWS_LOG_GROUP;
const AWS_LOG_STREAM = process.env.AWS_LOG_STREAM;
const AWS_KEY_ID = process.env.AWS_KEY_ID;
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY;
const AWS_LOG_REGION = process.env.AWS_LOG_REGION;

const logger = winston.createLogger({
    defaultMeta: { "timestamp": moment.utc().format(), "app": process.env.APP_NAME },
    format: winston.format.combine(
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new WinstonCloudWatch({
            jsonMessage: true,
            awsOptions: {
                credentials: {
                    accessKeyId: AWS_ACCESS_KEY,
                    secretAccessKey: AWS_KEY_ID
                }
            },
            level: 'error',
            logGroupName: AWS_LOG_GROUP,
            logStreamName: AWS_LOG_STREAM,
            awsAccessKeyId: AWS_KEY_ID,
            awsSecretKey: AWS_ACCESS_KEY,
            awsRegion: AWS_LOG_REGION
        })
    ]
})

module.exports = logger;