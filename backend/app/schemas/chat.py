from pydantic import BaseModel, Field
from typing import Literal


class ImageData(BaseModel):
    """画像データ"""
    media_type: Literal["image/jpeg", "image/png", "image/gif", "image/webp"]
    data: str = Field(..., description="Base64エンコードされた画像データ")


class ChatMessage(BaseModel):
    """チャットメッセージ"""
    role: Literal["user", "assistant"]
    content: str
    image: ImageData | None = Field(default=None, description="添付画像")


class ChatRequest(BaseModel):
    """チャットリクエスト"""
    message: str = Field(..., min_length=1, max_length=2000, description="ユーザーのメッセージ")
    image: ImageData | None = Field(default=None, description="添付画像")
    history: list[ChatMessage] = Field(default=[], description="会話履歴")
