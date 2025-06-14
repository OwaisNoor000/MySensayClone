import os
import dotenv
from llama_index.readers.github import GithubRepositoryReader,GithubClient
from llama_index.core import VectorStoreIndex,Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding

class GithubReader:
    def __init__(self,index_dir = "indexes/GithubIndex"):
        print("Loading enviroment variables, setting up Github client")
        dotenv.load_dotenv()
        self.client = GithubClient(github_token=os.environ.get("GITHUB_TOKEN"), verbose=True)
        self.branch = "main"
        self.owner = "OwaisNoor000"
        self.documents = object
        self.index_dir = index_dir
        self.repository = "MySensayClone"
        Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")

        
    def read_repo(self):
        print("reading Github repository")
        documents = GithubRepositoryReader(
            github_client=self.client,
            owner=self.owner,
            repo=self.repository,
            use_parser=False,
            verbose=False,
            filter_directories=(
                ["docs"],
                GithubRepositoryReader.FilterType.INCLUDE,
            ),
        ).load_data(branch=self.branch)

        self.documents = documents
        return documents

    def persist_indexes(self):
        print("Persisting index")
        index = VectorStoreIndex.from_documents(self.documents) 
        index.storage_context.persist(self.index_dir)
