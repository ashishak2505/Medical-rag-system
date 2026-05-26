from app.database.db import engine
from app.database.db import Base

from app.models.user_model import User
from app.models.report_model import Report
from app.models.chat_model import Chat

Base.metadata.create_all(bind=engine)

print("Tables created successfully")