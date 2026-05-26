from fastapi import APIRouter
from app.auth.auth_bearer import JWTBearer
from fastapi import Depends
from app.schemas.chat_schema import (
    ChatRequest
)

from app.rag.retriever import (
    retrieve_context
)


from app.services.groq_service import (
    ask_groq
)

router = APIRouter()


@router.post(
    "/ask",
    dependencies=[Depends(JWTBearer())]
)
def ask_question(chat: ChatRequest):

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
    return {
        "question": chat.question,
        "answer": answer
    }