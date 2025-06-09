from readers.PDFReader import PDFReader
from readers.GithubReader import GithubReader

#reader = PDFReader("data/resume.pdf")
#reader.read_contents()
#reader.persist_indexes()

reader2 = GithubReader()
reader2.read_repo()
reader2.persist_indexes()