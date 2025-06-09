from rag.engines.GithubEngine import GithubEngine

query_engine = GithubEngine()
query_engine.create_engine()
response = query_engine.answer("What does Batch.py do? and also, how many preprocessed pages does the book Jip&Janneke have?")
print(response)
