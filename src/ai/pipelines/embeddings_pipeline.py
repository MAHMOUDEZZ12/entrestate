# embeddings_pipeline.py

# This script contains the logic for creating text embeddings and indexing them
# into a vector database like Milvus, Pinecone, or Weaviate.

# In a production environment, this would be a more robust service, but this
# provides the core, reusable function.

from sentence_transformers import SentenceTransformer
# from pymilvus import connections, FieldSchema, CollectionSchema, DataType, Collection

# --- Mock Vector DB for demonstration ---
class MockVectorDBCollection:
    def __init__(self, name, schema):
        self.name = name
        self.schema = schema
        self.data = []
        print(f"Mock Vector DB Collection '{name}' initialized.")
    
    def insert(self, data):
        # In Milvus, data is column-oriented.
        # e.g., [[id1, id2], [vec1, vec2], [meta1, meta2]]
        print(f"Inserting {len(data[1])} vectors into '{self.name}'...")
        # Here we would actually store and index the data.
        pass

# --- End Mock Vector DB ---


def initialize_embeddings_pipeline():
    """
    Initializes the embedding model and the vector database connection.
    Returns the model and the vector DB collection object.
    """
    print("Initializing embeddings pipeline...")
    # Load a pre-trained model from Hugging Face
    model = SentenceTransformer('all-MiniLM-L6-v2')
    print("SentenceTransformer model loaded.")

    # In production, connect to your vector DB
    # connections.connect("default", host="MILVUS_HOST", port="19530")

    # Define the schema for our text embeddings
    # fields = [
    #     FieldSchema(name="id", dtype=DataType.INT64, is_primary=True, auto_id=True),
    #     FieldSchema(name="vector", dtype=DataType.FLOAT_VECTOR, dim=384),
    #     FieldSchema(name="source_id", dtype=DataType.VARCHAR, max_length=256),
    #     FieldSchema(name="doc_id", dtype=DataType.VARCHAR, max_length=256),
    # ]
    # schema = CollectionSchema(fields, "text_embeddings_for_semantic_search")
    
    # Create or load the collection
    # collection = Collection("embeddings_collection", schema)
    # collection.load()
    
    # Using mock for this environment
    collection = MockVectorDBCollection("embeddings_collection", schema={})

    print("Embeddings pipeline initialized successfully.")
    return model, collection


def index_text_batch(collection, model, batch: list[dict]):
    """
    Takes a batch of documents, creates embeddings, and indexes them.
    
    Args:
        collection: The vector database collection object.
        model: The loaded SentenceTransformer model.
        batch: A list of dictionaries, where each dict is a document.
               e.g., [{'source_id': 's1', 'doc_id': 'd1', 'text': '...'}, ...]
    """
    if not batch:
        return

    print(f"Processing a batch of {len(batch)} documents for embedding...")
    
    # Extract text for efficient batch encoding
    texts_to_encode = [doc['text'] for doc in batch]
    
    # Generate embeddings in a single batch call
    embeddings = model.encode(texts_to_encode)

    # Prepare data for insertion into the vector database
    source_ids = [doc['source_id'] for doc in batch]
    doc_ids = [doc['doc_id'] for doc in batch]
    vectors = [emb.tolist() for emb in embeddings]

    # Insert data into the collection
    # The format depends on the specific vector DB client library.
    # For PyMilvus, it's often column-based.
    # collection.insert([doc_ids, vectors, source_ids])
    
    # Mock insertion
    collection.insert([doc_ids, vectors, source_ids])

    print(f"Successfully indexed {len(batch)} documents.")


# Example usage:
if __name__ == '__main__':
    model, collection = initialize_embeddings_pipeline()

    # Example batch of documents from your ingestion pipeline
    document_batch = [
        {'source_id': 'bayut_listings', 'doc_id': 'bayut-123', 'text': 'Stunning 3-bedroom villa in Arabian Ranches with a private pool and garden.'},
        {'source_id': 'news_articles', 'doc_id': 'news-456', 'text': 'Emaar Properties reports record profits as Dubai real estate market soars.'},
        {'source_id': 'ad_creatives', 'doc_id': 'ad-789', 'text': 'Limited time offer! Own your dream home in Dubai Hills Estate. Register now.'},
    ]

    index_text_batch(collection, model, document_batch)
