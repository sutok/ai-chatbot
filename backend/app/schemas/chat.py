from pydantic import BaseModel, Field
from typing import Literal


class ChatMessage(BaseModel):
    """チャットメッセージ"""
    role: Literal["user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    """チャットリクエスト"""
    message: str = Field(..., min_length=1, max_length=2000, description="ユーザーのメッセージ")
    history: list[ChatMessage] = Field(default=[], description="会話履歴")
