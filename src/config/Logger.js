const winston = require("winston");
const WinstonCloudWatch = require("winston-cloudwatch");
const logger = winston.createLogger({
    defaultMeta: { "app": process.env.APP_NAME },
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.errors({ stack: true }),
        winston.format.json()
    ),
    transports: [
        new WinstonCloudWatch({
            jsonMessage: true,
            awsOptions: {
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY
                }
            },
            level: 'info',
            logGroupName: process.env.AWS_LOG_GROUP,
            logStreamName: process.env.AWS_LOG_STREAM_INFO,
            awsRegion: process.env.AWS_LOG_REGION
        }),
        new WinstonCloudWatch({
            jsonMessage: true,
            awsOptions: {
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY,
                    secretAccessKey: process.env.AWS_SECRET_KEY
                }
            },
            level: 'error',
            logGroupName: process.env.AWS_LOG_GROUP,
            logStreamName: process.env.AWS_LOG_STREAM,
            awsRegion: process.env.AWS_LOG_REGION
        })
    ]
})

module.exports = logger;