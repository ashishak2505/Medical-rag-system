from pydantic import BaseModel
from datetime import datetime


class ReportResponse(BaseModel):

    report_id: str
    filename: str
    uploaded_at: datetime

    class Config:
        from_attributes = True