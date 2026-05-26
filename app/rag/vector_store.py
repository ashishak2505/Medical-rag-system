import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="medical_reports"
)


def store_embedding(
    chunk_id,
    embedding,
    text,
    report_id
):

    collection.add(
        ids=[chunk_id],
        embeddings=[embedding],
        documents=[text],
        metadatas=[
            {
                "report_id": report_id
            }
        ]
    )