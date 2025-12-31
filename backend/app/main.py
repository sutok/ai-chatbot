import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from .routers import chat_router

# 環境変数読み込み
load_dotenv()

# FastAPIアプリケーション
app = FastAPI(
    title="ロボ - 癒し系AIチャットボット",
    description="癒し系ロボットキャラクター「ロボ」との雑談を楽しめるAPIです",
    version="1.0.0"
)

# CORS設定
origins = os.getenv("CORS_ORIGINS", "http://localhost:3000").split(",")
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ルーター登録
app.include_router(chat_router)


@app.get("/health")
async def health_check():
    """ヘルスチェック"""
    return {"status": "healthy", "service": "robo-chat-api"}


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=os.getenv("HOST", "0.0.0.0"),
        port=int(os.getenv("PORT", 8000)),
        reload=True
    )
