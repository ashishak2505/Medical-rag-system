from fastapi import FastAPI
from app.api.auth_routes import router as auth_router
from app.api.report_routes import router as report_router
from app.api.chat_routes import router as chat_router
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(title="Medical RAG API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def home():
    return {"message": "Medical RAG API Running"}


app.include_router(auth_router, prefix="/auth", tags=["Auth"])
app.include_router(report_router, prefix="/reports", tags=["Reports"])
app.include_router(chat_router, prefix="/chat", tags=["Chat"])