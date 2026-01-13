#################################
# Stage 1: Build
#################################
FROM node:20-alpine AS builder

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_BROWSERS_PATH=0

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    libc6-compat

COPY package.json package-lock.json* ./
RUN npm install

COPY . .
RUN npm run build

#################################
# Stage 2: E2E Tests
#################################
FROM node:20-alpine AS test

WORKDIR /app

ENV NODE_ENV=test
ENV NEXT_PUBLIC_API_URL=http://localhost:8000
ENV PLAYWRIGHT_SKIP_BROWSER_DOWNLOAD=1
ENV PLAYWRIGHT_BROWSERS_PATH=0

RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont \
    libc6-compat

COPY --from=builder /app /app

# 🔐 CI-safe: runs automatically during docker build
RUN npx playwright test

#################################
# Stage 3: Runtime
#################################
FROM node:20-alpine AS runtime

RUN addgroup -S appgroup && adduser -S appuser -G appgroup

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

COPY --from=builder /app/package.json .
COPY --from=builder /app/package-lock.json* .
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

USER appuser

EXPOSE 3000
CMD ["npm", "start"]
