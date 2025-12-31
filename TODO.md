# 実行計画 - 癒し系AIチャットボット「ロボ」

## 概要

CLAUDE.mdの仕様に基づき、アプリケーションを構築するためのTODOリストです。

---

## Phase 1: プロジェクト初期設定 ✅

### 1.1 ディレクトリ構成

- [x] モノレポのディレクトリ構造を作成
  ```
  todo/
  ├── frontend/
  ├── backend/
  ├── docker-compose.yml
  └── README.md
  ```

### 1.2 Git設定

- [x] `.gitignore` を作成（Python + Node.js用）
- [x] Git リポジトリを初期化

### 1.3 環境設定

- [x] `backend/.env.example` を作成
- [x] `frontend/.env.example` を作成

---

## Phase 2: Backend開発（FastAPI + uv） ✅

### 2.1 プロジェクトセットアップ

- [x] `backend/` ディレクトリ構造を作成
  ```
  backend/
  ├── app/
  │   ├── __init__.py
  │   ├── main.py
  │   ├── routers/
  │   ├── services/
  │   └── schemas/
  ├── pyproject.toml  # uv で管理
  └── Dockerfile
  ```
- [x] `pyproject.toml` に依存パッケージを定義
  - fastapi
  - uvicorn
  - anthropic
  - python-dotenv
  - pydantic

### 2.2 基本API実装

- [x] `app/main.py` - FastAPIアプリケーション基本設定
- [x] CORS設定（フロントエンドからのアクセス許可）
- [x] ヘルスチェックエンドポイント (`GET /health`)

### 2.3 Claude API統合

- [x] `app/services/claude_service.py` - Claude API クライアント実装
- [x] システムプロンプト（ロボのキャラクター設定）を定義
- [x] ストリーミングレスポンス対応

### 2.4 チャットエンドポイント

- [x] `app/schemas/chat.py` - リクエスト/レスポンスのスキーマ定義
- [x] `app/routers/chat.py` - チャットルーター実装
- [x] `POST /api/chat` エンドポイント（ストリーミング対応）

### 2.5 安全機能

- [x] 最低限のNGワードフィルター実装
- [x] 入力文字数の制限

### 2.6 Backend動作確認

- [x] ローカルでの起動確認 (`uv run uvicorn app.main:app --reload`)
- [x] curlまたはPostmanでAPIテスト

---

## Phase 3: Frontend開発（Next.js） ✅

### 3.1 プロジェクトセットアップ

- [x] Next.js プロジェクト作成 (`create-next-app`)
- [x] TypeScript設定確認
- [x] ディレクトリ構造整備
  ```
  frontend/src/
  ├── app/
  ├── components/
  ├── hooks/
  ├── lib/
  └── types/
  ```

### 3.2 スタイリング設定

- [x] Tailwind CSS セットアップ（またはお好みのCSS）
- [x] グローバルスタイル設定（癒し系カラーパレット）
- [x] レスポンシブ対応の基本設定

### 3.3 型定義

- [x] `types/chat.ts` - メッセージ、会話履歴の型定義

### 3.4 API連携

- [x] `lib/api.ts` - バックエンドAPI呼び出し関数
- [x] ストリーミングレスポンスの処理実装

### 3.5 カスタムフック

- [x] `hooks/useChat.ts` - チャット状態管理
- [x] `hooks/useLocalStorage.ts` - ローカルストレージ連携
- [x] `hooks/useSpeechRecognition.ts` - 音声入力

### 3.6 UIコンポーネント

- [x] `components/ChatContainer.tsx` - チャット画面全体のコンテナ
- [x] `components/MessageList.tsx` - メッセージ一覧表示
- [x] `components/MessageBubble.tsx` - 個別メッセージの吹き出し
- [x] `components/ChatInput.tsx` - テキスト入力欄
- [x] `components/VoiceInputButton.tsx` - 音声入力ボタン
- [x] `components/Avatar.tsx` - ロボのアバター表示
- [x] `components/LoadingIndicator.tsx` - ローディング表示

### 3.7 ページ実装

- [x] `app/page.tsx` - メインチャットページ
- [x] `app/layout.tsx` - 共通レイアウト

### 3.8 会話履歴機能

- [x] ローカルストレージへの保存処理
- [x] アプリ起動時の履歴読み込み
- [x] 履歴クリア機能

### 3.9 音声入力機能

- [x] Web Speech API 統合
- [x] マイク権限のハンドリング
- [x] 音声認識結果のテキスト反映

### 3.10 Frontend動作確認

- [x] ローカルでの起動確認
- [x] バックエンドとの連携テスト

---

## Phase 4: Docker化 ✅

### 4.1 Backend Docker設定

- [x] `backend/Dockerfile` 作成（uv使用）
- [x] 単体でのビルド・起動確認

### 4.2 Frontend Docker設定

- [x] `frontend/Dockerfile` 作成
- [x] 単体でのビルド・起動確認

### 4.3 Docker Compose設定

- [x] `docker-compose.yml` 作成
- [x] 環境変数の設定
- [x] `docker-compose up` での統合起動確認

---

## Phase 5: 統合テスト・仕上げ ✅

### 5.1 統合テスト

- [x] エンドツーエンドの動作確認
  - [x] テキストチャットの送受信
  - [x] ストリーミング表示
  - [x] 会話履歴の保存・復元
  - [x] 音声入力
- [x] エラーハンドリングの確認
- [x] レスポンシブデザインの確認

### 5.2 ドキュメント整備

- [x] `README.md` 作成
  - [x] プロジェクト概要
  - [x] セットアップ手順
  - [x] 起動方法
  - [x] 環境変数の説明

### 5.3 最終確認

- [x] 本番想定環境でのテスト
- [x] パフォーマンス確認

---

## 補足: 依存関係

```
Phase 1 → Phase 2 → Phase 3 → Phase 4 → Phase 5
              ↓         ↓
          （並行開発可能）
```

- Phase 2（Backend）と Phase 3（Frontend）は並行して開発可能
- Phase 4 は Backend/Frontend 両方の完成後
- Phase 5 は全体統合後

---

## 推定作業項目数

| Phase | 項目数 | 完了 |
|-------|--------|------|
| Phase 1: 初期設定 | 5 | ✅ 5/5 |
| Phase 2: Backend (uv) | 14 | ✅ 14/14 |
| Phase 3: Frontend | 22 | ✅ 22/22 |
| Phase 4: Docker | 5 | ✅ 5/5 |
| Phase 5: 仕上げ | 8 | ✅ 8/8 |
| **合計** | **54** | **54/54** |

---

## 完了 🎉

全タスク完了しました。

### 起動コマンド

```bash
podman compose up -d
```

### アクセス

- チャット画面: http://localhost:3000
- API ドキュメント: http://localhost:8000/docs

---

## 開発コマンド

### Backend（uv使用）

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
```

### Frontend（npm使用）

```bash
cd frontend

# 依存パッケージをインストール
npm install

# 開発サーバー起動
npm run dev
```

