from llama_index.core import Document,VectorStoreIndex,Settings
from llama_index.embeddings.huggingface import HuggingFaceEmbedding
import re
import fitz

class PDFReader:
    def __init__(self,contents_file_path="data/resume.pdf",index_dir="indexes/ResumeIndex"):
        self.data_dir = contents_file_path
        self.index_dir = index_dir
        self.documents = object
        
        Settings.embed_model = HuggingFaceEmbedding(model_name="sentence-transformers/all-MiniLM-L6-v2")


    def read_contents(self):
        # Input array
        input_array = []

        doc = fitz.open(self.data_dir) 

        for page in doc:
            text = page.get_text()
            lines = text.splitlines()
            for line in lines:
                input_array.append(line)
        
        input_array = [' '.join(x.strip().split()) for x in input_array if x.strip() != ""]


        # Delimiter condition
        delimiter = "---"
        delimiter = "-{3,}.*"

        # Splitting the array
        result = []
        current_group = []
        delimiters = []

        for element in input_array:
            #if element.replace("\n","").endswith(delimiter):
            if re.search(delimiter,element)!=None:
                # If the delimiter is found, save the current group and start a new one
                if current_group:  # Avoid appending empty groups
                    result.append(current_group)
                current_group = []
                delimiters.append(element)
            else:
                current_group.append(element)

        # Add the last group if it exists
        if current_group:
            result.append(current_group)

        # print(len(delimiters))
        # print(len(result))
        documents = []
        for index,section in enumerate(result):
            text = ";".join(section)
            doc = Document(text=text)
            documents.append(doc)

        self.documents = documents        
        return documents

        
    def persist_indexes(self):
        index = VectorStoreIndex.from_documents(self.documents) 
        index.storage_context.persist(self.index_dir)

