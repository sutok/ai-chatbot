FROM python:3.11-slim

# uvをインストール
COPY --from=ghcr.io/astral-sh/uv:latest /uv /usr/local/bin/uv

WORKDIR /app

# 依存パッケージをインストール
COPY pyproject.toml .
RUN uv sync --no-dev --no-install-project

# アプリケーションコードをコピー
COPY . .

# ポート公開
EXPOSE 8000

# アプリケーション起動
CMD ["uv", "run", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
