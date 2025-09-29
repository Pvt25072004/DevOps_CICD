# Stage 1: Build
FROM node:20 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install --production

COPY . .

# Stage 2: Runtime
FROM node:20-slim AS runtime

WORKDIR /app
COPY --from=build /app .

ENV PORT=3000
EXPOSE 3000

CMD ["node", "app.js"]
