from sentence_transformers import SentenceTransformer

model = None

def get_model():
    global model

    if model is None:
        model = SentenceTransformer("all-MiniLM-L6-v2")

    return model


def create_embedding(text):
    model = get_model()
    embedding = model.encode(text)
    return embedding.tolist()