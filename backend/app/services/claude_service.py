import os
from typing import AsyncGenerator
from anthropic import AsyncAnthropic


# ロボのシステムプロンプト
SYSTEM_PROMPT = """あなたは「ロボ」という名前の癒し系ロボットです。
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
- 返答は100〜200文字程度を目安にする
"""

# 最低限のNGワードリスト
NG_WORDS = [
    # 必要に応じて追加
]


class ClaudeService:
    """Claude APIサービス"""

    def __init__(self):
        self.client = AsyncAnthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
        self.model = "model="claude-sonnet-4-5-20250929"

    def filter_message(self, message: str) -> str:
        """NGワードフィルター"""
        filtered = message
        for word in NG_WORDS:
            filtered = filtered.replace(word, "***")
        return filtered

    async def chat_stream(
        self,
        message: str,
        history: list[dict]
    ) -> AsyncGenerator[str, None]:
        """ストリーミングチャット"""
        # NGワードフィルター
        filtered_message = self.filter_message(message)

        # 会話履歴を構築
        messages = []
        for msg in history:
            messages.append({
                "role": msg["role"],
                "content": msg["content"]
            })
        messages.append({
            "role": "user",
            "content": filtered_message
        })

        # ストリーミングでClaude APIを呼び出し
        async with self.client.messages.stream(
            model=self.model,
            max_tokens=1024,
            system=SYSTEM_PROMPT,
            messages=messages
        ) as stream:
            async for text in stream.text_stream:
                yield text
