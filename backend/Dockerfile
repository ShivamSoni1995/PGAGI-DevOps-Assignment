# -------------------------
# Stage 1: Base
# -------------------------
FROM python:3.11-slim AS base

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# -------------------------
# Stage 2: Dependencies
# -------------------------
FROM base AS deps

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# -------------------------
# Stage 3: Test
# -------------------------
FROM deps AS test

COPY app ./app
CMD ["pytest", "-q"]

# -------------------------
# Stage 4: Runtime
# -------------------------
FROM deps AS runtime

RUN useradd -m appuser
USER appuser

COPY app ./app

EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
