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

app.use((error, request, response, next) => {
    logger.error(error)
    response.status(500).json({
        statusCode: 500,
        message: "Internal server error"
    })
})

app.listen(process.env.PORT, () => console.log(`Server is running in address: localhost:3000`))
