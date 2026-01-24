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
# Stage 3: Test (Playwright)
# -------------------------
FROM deps AS test

# Install Playwright browsers + deps
RUN npx playwright install --with-deps

COPY . .

ENV CI=true
ENV NEXT_PUBLIC_API_URL=http://localhost:8000

RUN npx playwright test

# -------------------------
# Stage 4: Build
# -------------------------
FROM deps AS build

COPY . .

# ✅ Inject backend URL at build time
ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

RUN npm run build

# -------------------------
# Stage 5: Runtime
# -------------------------
FROM node:20-slim AS runtime

WORKDIR /app
ENV NODE_ENV=production

# Non-root user
RUN useradd -m appuser
USER appuser

# Copy build output
COPY --from=build /app/package.json .
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next

# ✅ Required for Next.js
COPY --from=build /app/public ./public

EXPOSE 3000
CMD ["npm", "start"]
