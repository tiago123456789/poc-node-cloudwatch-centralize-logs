require("dotenv").config()
const logger = require("./config/Logger")
const express = require("express")
const app = express();

app.get("/error", (request, response, next) => {
    try {
        throw new Error("Occour one error this moment")
    } catch(error) {
        next(error);
    }
})


app.get("/error2", (request, response, next) => {
    try {
        throw new Error("Error generate to show log in cloudwatch")
    } catch(error) {
        next(error);
    }
})

app.get("/welcome", (request, response) => {
    logger.info(`User accessing ${request.url}`)
    response.json({ message: "Welcome everyone" })
})

app.use((request, response, next) => {
    logger.info(`User try request ${request.url} not found`)
    response.status(404).json({ message: "Route not found"})
})

app.use((error, request, response, next) => {
    logger.error(error)
    response.status(500).json({
        statusCode: 500,
        message: "Internal server error"
    })
})


app.listen(process.env.PORT, () => console.log(`Server is running in address: localhost:3000`))
