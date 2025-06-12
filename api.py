from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time
from rag.engines.PDFEngine import PDFEngine
from llama_index.core.tools import ToolMetadata
from llama_index.core.selectors import LLMSingleSelector
from supabasedb.MeetingRequests import MeetingRequests
from supabasedb.MeetingRequestsDao import MeetingRequestsDao

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

        choices = [
            ToolMetadata(description="General questions about Owais's resume", name="resume"),
            ToolMetadata(description="Request to send a message to Owais", name="message"),
            ToolMetadata(description="An out of scope question or request that is not a resume question or a message request", name="fallback"),
            # ToolMetadata(description="Question not even remotely related at all to socks, the website, the business.", name="c")
            ]
                
        selector = LLMSingleSelector.from_defaults()
        selector_result = selector.select(choices, query=data)

        if selector_result.selections[0].index == 0:
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
        elif selector_result.selections[0].index == 1:
            meetingRequest = MeetingRequests(data)
            try:
                await dao.create(meetingRequest)

                await websocket.send_json({
                    "type":"message_segment",
                    "text":"Your request has been emailed to Owais!"
                })

                await websocket.send_json({
                    "type":"message_end",
                    "text":""
                })
            except Exception as e:
                print(e)


        elif selector_result.selections[0].index == 2:
            await websocket.send_json({
                "type":"message_segment",
                "text":"Im Sorry your question is out of scope, forgive me if it's not, Im just a dumb AI :-(. Maybe reword it?"
            })

            await websocket.send_json({
                "type":"message_end",
                "text":""
            })


        