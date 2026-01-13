############################
# Stage 1: Builder
############################
FROM python:3.11-slim AS builder

WORKDIR /app

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

COPY requirements.txt .
RUN pip install --upgrade pip \
    && pip install --prefix=/install -r requirements.txt \
    && pip install --prefix=/install pytest

############################
# Stage 2: Test
############################
FROM python:3.11-slim AS test

WORKDIR /app

COPY --from=builder /install /usr/local
COPY main.py .
COPY tests ./tests

RUN pytest

############################
# Stage 3: Runtime
############################
FROM python:3.11-slim AS runtime

WORKDIR /app

RUN useradd -m appuser

COPY --from=builder /install /usr/local
COPY main.py .

USER appuser

EXPOSE 8000

CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
