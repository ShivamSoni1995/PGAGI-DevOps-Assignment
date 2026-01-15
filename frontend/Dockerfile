# -------------------------
# Stage 1: Base
# -------------------------
FROM node:20-slim AS base
WORKDIR /app

# -------------------------
# Stage 2: Dependencies
# -------------------------
FROM base AS deps

COPY package.json package-lock.json* ./
RUN npm ci

# -------------------------
# Stage 3: Test
# -------------------------
FROM deps AS test

RUN npx playwright install --with-deps

COPY . .

ENV CI=true
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

RUN npx playwright test


# Install Playwright browsers + system deps

# Required 
# -------------------------
# Stage 4: Build
# -------------------------
FROM deps AS build

COPY . .
RUN npm run build

# -------------------------
# Stage 5: Runtime
# -------------------------
FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

RUN useradd -m appuser
USER appuser

COPY --from=build /app/package.json .
COPY --from=build /app/package-lock.json* .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

EXPOSE 3000
CMD ["npm", "start"]
