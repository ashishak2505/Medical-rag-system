from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.auth.auth_bearer import JWTBearer
from app.schemas.chat_schema import ChatRequest
from app.rag.retriever import retrieve_context
from app.services.groq_service import ask_groq

from app.database.db import get_db
from app.models.chat_model import Chat


router = APIRouter()


@router.post(
    "/ask",
    dependencies=[Depends(JWTBearer())]
)
def ask_question(
    chat: ChatRequest,
    db: Session = Depends(get_db)
):

    context = retrieve_context(
        chat.question,
        chat.report_id
    )

    print("Retrieved Context:", context)

    answer = ask_groq(
        context,
        chat.question
    )

    print("Generated Answer:", answer)

    # SAVE CHAT TO DATABASE
    new_chat = Chat(
        question=chat.question,
        answer=answer,
        report_id=chat.report_id
    )

    db.add(new_chat)
    db.commit()
    db.refresh(new_chat)

    return {
        "question": chat.question,
        "answer": answer
    }
@router.get("/history/{report_id}")
def get_chat_history(
    report_id: str,
    db: Session = Depends(get_db)
):

    chats = db.query(Chat).filter(
        Chat.report_id == report_id
    ).all()

    return [
        {
            "question": chat.question,
            "answer": chat.answer
        }
        for chat in chats
    ]