FROM node:14

ENV PORT="6450"

WORKDIR /app
COPY . ./

RUN npm run build
EXPOSE 6450
CMD ["npm", "start"]
