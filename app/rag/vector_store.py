import chromadb

_client = None
_collection = None


def get_collection():
    global _client, _collection

    if _collection is None:
        _client = chromadb.PersistentClient(
            path="chroma_db"
        )

        _collection = _client.get_or_create_collection(
            name="medical_reports"
        )

    return _collection


def store_embedding(
    chunk_id,
    embedding,
    text,
    report_id
):
    collection = get_collection()

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