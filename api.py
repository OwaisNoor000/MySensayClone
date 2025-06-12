from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time
from rag.engines.PDFEngine import PDFEngine
from llama_index.core.tools import ToolMetadata
from llama_index.core.selectors import LLMSingleSelector
from supabasedb.MeetingRequests import MeetingRequests
from supabasedb.MeetingRequestsDao import MeetingRequestsDao
from supabasedb.EmailRequest import EmailRequest
from llama_index.core import Settings
from llama_index.llms.ollama import Ollama


Settings.llm = Ollama(model="llama3.2:3b",request_timeout=120.0,context_window=8000)


engine = PDFEngine()
engine.create_engine()

dao = MeetingRequestsDao()

app = FastAPI()
origins = [
    "http://localhost:5173"
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/llm")
async def answer(websocket:WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        print("data:",data)
        engine_reference = engine.get_engine()
        streaming_response = engine_reference.query(f"You are an AI clone of Owais Noor, an AI designed to impress job recruiters, use his resume data to convince them to answer their questions .{data}.   Please ensure that your output is well formatted,bulleted and spaced in markdown")
        async def send_chunks():
            for chunk in streaming_response.response_gen:
                if chunk is not None:
                    print(chunk)
                    await websocket.send_json({
                        "type": "message_segment",
                        "text": chunk
                    })

        await send_chunks() # ensure the rest of the code waits

        await websocket.send_json({
            "type": "message_end",
            "text": "",
        })


@app.post("/email")
async def send_email(request:EmailRequest):
    email_contents = request.emailContents
    meetingRequest = MeetingRequests(email_contents)
    try:
        dao.create(meetingRequest)
    except Exception as e:
        print(e)