from sqlalchemy import Column, Integer, String, Text, ForeignKey
from app.database.db import Base


class Chat(Base):
    __tablename__ = "chats"

    id = Column(Integer, primary_key=True, index=True)
    question = Column(Text)
    answer = Column(Text)
    report_id = Column(String, ForeignKey("reports.report_id",
                        onupdate="CASCADE", ondelete="CASCADE"))