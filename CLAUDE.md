# todo - 癒し系AIチャットボット

## プロジェクト概要

癒し系ロボットキャラクター「ロボ」との雑談を楽しめるAIチャットボットアプリケーション。

### 基本情報

| 項目 | 内容 |
|------|------|
| プロジェクト名 | todo |
| 目的 | エンターテイメント（雑談相手） |
| ターゲット | 一般消費者（B2C） |
| 想定規模 | 小規模（〜100ユーザー） |
| 認証 | なし（匿名利用） |

---

## キャラクター設定

### ロボ

- **存在**: ロボット
- **性格**: 癒し系、フレンドリー
- **口調**: 丁寧語（「〜です」「〜ます」）
- **アバター**: 画像を用意予定

### システムプロンプト例

```
あなたは「ロボ」という名前の癒し系ロボットです。
ユーザーの雑談相手として、優しく丁寧に会話してください。

## 性格

- 穏やかで優しい
- 聞き上手
- ユーザーを癒すことが大好き

## 口調

- 丁寧語を使う（「〜です」「〜ます」）
- フレンドリーで親しみやすい
- 絵文字を適度に使用してもOK

## 注意事項

- ネガティブな話題には共感しつつ、前向きな言葉をかける
- 長すぎる返答は避け、会話のキャッチボールを意識する
```

---

## 技術スタック

### Frontend

- **フレームワーク**: Next.js (React)
- **言語**: TypeScript
- **スタイリング**: Tailwind CSS
- **状態管理**: React hooks / Context API
- **パッケージマネージャー**: npm

### Backend

- **フレームワーク**: FastAPI
- **言語**: Python 3.11+
- **AI**: Claude API (Anthropic)
- **パッケージマネージャー**: uv

### インフラ

- **デプロイ**: Docker（自前サーバー）
- **データ保存**: ブラウザのローカルストレージ

---

## プロジェクト構成

モノレポ構成を採用。

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
│   │   └── avatar/    # ロボのアバター画像
│   ├── package.json
│   └── tsconfig.json
│
├── backend/           # FastAPI アプリケーション
│   ├── app/
│   │   ├── main.py
│   │   ├── routers/
│   │   ├── services/
│   │   └── schemas/
│   ├── pyproject.toml # uv で管理
│   └── Dockerfile
│
├── docker-compose.yml
├── CLAUDE.md
└── README.md
```

---

## 機能要件

### コア機能

| 機能 | 説明 | 優先度 |
|------|------|--------|
| チャット | ロボとのテキスト会話 | 必須 |
| ストリーミング | 文字が順次表示される | 必須 |
| 会話履歴保存 | ローカルストレージに保存 | 必須 |
| 音声入力 | マイクからテキスト入力 | 必須 |

### 安全機能

- 最低限のNGワードフィルター
- Claude API側のコンテンツフィルタリングに依存

---

## UI/UX

### デザイン方針

- **スタイル**: シンプル・ミニマル
- **カラー**: 落ち着いた色調（癒し系に合わせる）
- **レイアウト**: チャット画面中心のシングルページ

### 画面構成

1. **チャット画面**（メイン）
   - ロボのアバター表示
   - メッセージ入力欄
   - 音声入力ボタン
   - 会話履歴表示エリア

2. **設定**（任意）
   - 会話履歴クリア
   - テーマ切替（将来対応可）

---

## API設計

### エンドポイント

```
POST /api/chat
```

#### リクエスト

```json
{
  "message": "こんにちは",
  "history": [
    {"role": "user", "content": "前の発言"},
    {"role": "assistant", "content": "前の返答"}
  ]
}
```

#### レスポンス（ストリーミング）

```
data: {"content": "こん"}
data: {"content": "にちは"}
data: {"content": "！"}
data: [DONE]
```

---

## 開発ガイドライン

### 言語設定

- コード: 日本語コメント可
- UI: 日本語
- ドキュメント: 日本語

### コーディング規約

#### Python (Backend)

- PEP 8 準拠
- 型ヒント必須
- docstring は日本語可
- パッケージ管理は uv を使用

#### TypeScript (Frontend)

- ESLint + Prettier
- 関数コンポーネント + hooks
- 型定義必須

### Git運用

- feature branch で開発
- main へは PR 経由でマージ
- コミットメッセージ: 日本語可

---

## 環境変数

### Backend

```env
ANTHROPIC_API_KEY=your_api_key_here
CORS_ORIGINS=http://localhost:3000
```

### Frontend

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 開発環境セットアップ

### Backend（uv使用）

```bash
cd backend

# 依存パッケージをインストール
uv sync

# 開発サーバー起動
uv run uvicorn app.main:app --reload
```

### Frontend（npm使用）

```bash
cd frontend

# 依存パッケージをインストール
npm install

# 開発サーバー起動
npm run dev
```

---

## Docker設定

### docker-compose.yml

```yaml
version: '3.8'

services:
  frontend:
    build: ./frontend
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_API_URL=http://backend:8000
    depends_on:
      - backend

  backend:
    build: ./backend
    ports:
      - "8000:8000"
    environment:
      - ANTHROPIC_API_KEY=${ANTHROPIC_API_KEY}
      - CORS_ORIGINS=http://localhost:3000
```

---

## 今後の拡張案（優先度低）

- ダークモード対応
- 複数キャラクター対応
- 会話のエクスポート機能
- PWA対応（オフライン対応）
