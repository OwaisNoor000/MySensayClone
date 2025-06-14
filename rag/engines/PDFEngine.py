from llama_index.core import StorageContext,load_index_from_storage,Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
from llama_index.llms.ollama import Ollama

class PDFEngine:
    def __init__(self,index_dir="rag/indexes/ResumeIndex"):
        print("Initializing indexes,llm and embeddings")
        self.index_dir = index_dir
        Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")
        Settings.llm = Ollama(model="llama3.2:3b",requesttimeout=120.0,context_window=8000)
        self.query_engine = object

    def create_engine(self):
        print("generating LLMs")
        storage_context = StorageContext.from_defaults(persist_dir=self.index_dir)
        index = load_index_from_storage(storage_context)
        self.query_engine = index.as_query_engine(streaming=True)

    def answer(self,question:str):
        print("Querying the LLM")
        response = self.query_engine.query(question)
        return response.response
    
    def get_engine(self):
        return self.query_engine