import { Router } from 'express'
import config from '../../config/config'
import { asyncHandler } from '../../middlewares/asyncHandler'

export const uploadRoute = Router()

uploadRoute.post(
    '/upload-file',
    asyncHandler(async (req, res) => {
        if (!req.files) {
            res.end('Failed to upload files\n')
            return
        }

        const uploadedFiles = Array.isArray(req.files) ? req.files : [req.files]
        const results: { from: unknown; files: Record<string, string> } = {
            from: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
            files: {},
        }

        for (const { data } of uploadedFiles) {
            const name = data.name
                .replace(/[^a-zA-Z0-9_.]/g, '_')
                .replace(/_+/g, '_')
                .toLowerCase()
            await data.mv(`${config.uploadDest}/${name}`)
            results.files[data.name] = `${config.uploadUrl}/${name}`
        }

        res.json(results)
    })
)
