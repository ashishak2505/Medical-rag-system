from app.rag.vector_store import collection

from app.services.embedding_service import (
    create_embedding
)


def retrieve_context(
    question,
    report_id
):

    question_embedding = create_embedding(
        question
    )

    results = collection.query(
        query_embeddings=[question_embedding],
        n_results=3,
        where={
            "report_id": report_id
        }
    )

    documents = results["documents"][0]

    return "\n".join(documents)