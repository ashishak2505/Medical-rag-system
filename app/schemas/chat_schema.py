from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str
    report_id: str