FROM node:20-alpine

# NZ-local timestamps for submissions and emails
RUN apk add --no-cache tzdata
ENV TZ=Pacific/Auckland

WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev

COPY . .

ENV NODE_ENV=production

# Cloud Run injects PORT (default 8080); app.js reads process.env.PORT
EXPOSE 8080

CMD ["node", "app.js"]
