from fastapi import APIRouter
from fastapi.responses import StreamingResponse
from ..schemas.chat import ChatRequest
from ..services.claude_service import ClaudeService

router = APIRouter(prefix="/api", tags=["chat"])

claude_service = ClaudeService()


@router.post("/chat")
async def chat(request: ChatRequest):
    """チャットエンドポイント（ストリーミング、マルチモーダル対応）"""

    # 画像データを辞書に変換
    image_data = None
    if request.image:
        image_data = request.image.model_dump()

    async def generate():
        async for chunk in claude_service.chat_stream(
            message=request.message,
            history=[msg.model_dump() for msg in request.history],
            image=image_data
        ):
            # Server-Sent Events形式
            yield f"data: {chunk}\n\n"
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        generate(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
        }
    )
