import { Router } from 'express'

import { uploadRoute } from './upload-route'

export const routes = Router()

routes.use('/upload', uploadRoute)
