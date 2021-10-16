# node-file-upload

> Upload files with nodejs

## Usage

TODO

## Installation and Running

1. `npm install`
2. `npm run build`
3. `npm run start` (don't forget to set the [environment variables](#environment-variables))

## Environment Variables
```
# SERVER
PORT=6450
AUTH_TOKEN=set your auth token!
```

Environment variables are processed in [config](./src/config/config.ts).
It's also possible to use [.env](https://www.npmjs.com/package/dotenv) file for development.

## Endpoints

- POST `/v1/upload/upload-file`

TODO

### Health Check

- `/health/liveness` - Liveness check
- `/health/readiness` - Readiness check
- `/health` - Combined Health (Readiness and Liveness) checks
