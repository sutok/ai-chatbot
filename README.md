# ロボ - 癒し系AIチャットボット

癒し系ロボットキャラクター「ロボ」との雑談を楽しめるAIチャットボットアプリケーションです。

![demo](./sample.webm)

## 機能

- テキストチャット（ストリーミング対応）
- 音声入力
- 会話履歴の保存（ブラウザのローカルストレージ）

## 技術スタック

- **Frontend**: Next.js 14 (React, TypeScript, Tailwind CSS)
- **Backend**: FastAPI (Python, uv)
- **AI**: Claude API (Anthropic)
- **インフラ**: Docker

## セットアップ

### 必要な環境

- Docker & Docker Compose
- Anthropic API キー

または、ローカル開発の場合:

- Node.js 20+
- Python 3.11+
- uv (Python パッケージマネージャー)

### 環境変数の設定

1. プロジェクトルートに `.env` ファイルを作成

```bash
cp backend/.env.example .env
```

2. `.env` ファイルを編集し、Anthropic API キーを設定

```env
ANTHROPIC_API_KEY=your_api_key_here
```

### 起動方法

#### Docker Compose を使用（推奨）

```bash
# ビルドと起動
docker-compose up --build

# バックグラウンドで起動
docker-compose up -d --build
```

アプリケーションにアクセス:
- Frontend: http://localhost:3000
- Backend API: http://localhost:8000
- API ドキュメント: http://localhost:8000/docs

#### ローカル開発（Docker なし）

##### Backend（uv使用）

```bash
cd backend

# uv がインストールされていない場合
curl -LsSf https://astral.sh/uv/install.sh | sh

# 依存パッケージをインストール
uv sync

# .env ファイルを作成
cp .env.example .env
# .env ファイルを編集して API キーを設定

# 開発サーバー起動
uv run uvicorn app.main:app --reload
```

##### Frontend

```bash
cd frontend

# 依存パッケージをインストール
npm install

# .env.local ファイルを作成
cp .env.example .env.local

# 開発サーバー起動
npm run dev
```

## プロジェクト構成

```
todo/
├── frontend/          # Next.js アプリケーション
│   ├── src/
│   │   ├── app/       # App Router
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   ├── public/
│   ├── Dockerfile
│   └── package.json
│
├── backend/           # FastAPI アプリケーション
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── services/
│   │   └── schemas/
│   ├── Dockerfile
│   └── pyproject.toml # uv で管理
│
├── docker-compose.yml
├── CLAUDE.md          # プロジェクト仕様書
└── README.md
```

## 開発コマンド

### Backend（uv）

```bash
cd backend

# 依存パッケージをインストール
uv sync

# 開発サーバー起動
uv run uvicorn app.main:app --reload

# パッケージ追加
uv add <package-name>

# 開発用パッケージ追加
uv add --dev <package-name>

# テスト実行
uv run pytest
```

### Frontend（npm）

```bash
cd frontend

# 依存パッケージをインストール
npm install

# 開発サーバー起動
npm run dev

# ビルド
npm run build

# 本番サーバー起動
npm start
```

## API エンドポイント

### POST /api/chat

チャットメッセージを送信し、ストリーミングでレスポンスを受信します。

**リクエスト**

```json
{
  "message": "こんにちは",
  "history": [
    {"role": "user", "content": "前の発言"},
    {"role": "assistant", "content": "前の返答"}
  ]
}
```

**レスポンス（Server-Sent Events）**

```
data: こん
data: にちは
data: ！
data: [DONE]
```

### GET /health

ヘルスチェックエンドポイント。

## ライセンス

MIT License
