import os
import uuid

from fastapi import (
    APIRouter,
    HTTPException,
    UploadFile,
    File,
    Depends,
    Request
)

from sqlalchemy.orm import Session

from app.database.db import get_db
from app.schemas.report_schema import ReportResponse
from app.models.chat_model import Chat

from app.models.user_model import User
from app.models.report_model import Report

from app.auth.auth_bearer import JWTBearer
from app.services.ocr_service import (
    extract_text_from_scanned_pdf
)

from app.services.pdf_service import (
    extract_text_from_pdf
)

from app.rag.chunking import (
    chunk_text
)

from app.services.embedding_service import (
    create_embedding
)

from app.rag.vector_store import (
    store_embedding
)

router = APIRouter()

UPLOAD_DIR = "uploads"


@router.post(
    "/upload",
    dependencies=[Depends(JWTBearer())]
    
)
async def upload_report(
    request: Request,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    user_email = request.state.user["sub"]

    user = db.query(User).filter(
        User.email == user_email
    ).first()

    report_uuid = str(uuid.uuid4())

    file_path = os.path.join(
        UPLOAD_DIR,
        file.filename
    )

    with open(file_path, "wb") as f:
        f.write(await file.read())

    extracted_text = extract_text_from_pdf(
    file_path
    )

# If normal extraction fails,
# use OCR

    if not extracted_text or extracted_text.strip() == "":

        extracted_text = extract_text_from_scanned_pdf(
            file_path
    )
    print("\n\n===== EXTRACTED TEXT =====\n")
    print(extracted_text)
    print("\n==========================\n")

    new_report = Report(
        report_id=report_uuid,
        filename=file.filename,
        extracted_text=extracted_text,
        user_id=user.id
    )

    db.add(new_report)
    db.commit()

    chunks = chunk_text(extracted_text)

    for chunk in chunks:

        embedding = create_embedding(chunk)

        chunk_id = str(uuid.uuid4())

        store_embedding(
            chunk_id,
            embedding,
            chunk,
            report_uuid
        )

    return {
        "message": "Report uploaded successfully",
        "report_id": report_uuid,
        "chunks_stored": len(chunks)
    }


@router.get(
    "/my-reports",
    response_model=list[ReportResponse],
    dependencies=[Depends(JWTBearer())]
)
def get_my_reports(
    request: Request,
    db: Session = Depends(get_db)
):

    user_email = request.state.user["sub"]

    user = db.query(User).filter(
        User.email == user_email
    ).first()

    reports = db.query(Report).filter(
        Report.user_id == user.id
    ).all()

    return reports
@router.delete("/{report_id}",dependencies=[Depends(JWTBearer())])
def delete_report(
    report_id: str,
    request: Request,
    db: Session = Depends(get_db)
):
    user_email = request.state.user["sub"]

    user = db.query(User).filter(
        User.email == user_email
    ).first()

    report = db.query(Report).filter(
        Report.report_id == report_id,
        Report.user_id == user.id
    ).first()

    if not report:
        raise HTTPException(status_code=404, detail="Report not found")
    
    db.query(Chat).filter(
        Chat.report_id == report.report_id
    ).delete()
    db.commit()

    db.delete(report)
    db.commit()

    return {"message": "Report deleted successfully"}