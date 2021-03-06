import express from 'express'
import httpStatus from 'http-status'
import { HealthEndpoint, LivenessEndpoint, ReadinessEndpoint } from './middlewares/health'
import fileUpload from 'express-fileupload'

import { routes } from './routes/v1/index'
import { ApiError } from './error'
import { errorConverter, errorHandler } from './middlewares/error'
import config from './config/config'

export const app = express()

app.use('/health/liveness', LivenessEndpoint)
app.use('/health/readiness', ReadinessEndpoint)
app.use('/health', HealthEndpoint)

app.use((req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(403).send()
    }
    if (req.headers.authorization !== config.authToken) {
        return res.status(401).send()
    }
    next()
})

app.use(
    '/v1/upload/upload-file',
    fileUpload({
        createParentPath: true,
        useTempFiles: true,
    })
)

// v1 api routes
app.use('/v1', routes)

// send back a 404 error for any unknown api request
app.use((req, res, next) => {
    next(new ApiError(httpStatus.NOT_FOUND, 'Not found'))
})

// convert error to ApiError, if needed
app.use(errorConverter)

// handle error
app.use(errorHandler)
