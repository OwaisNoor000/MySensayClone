from fastapi import FastAPI, WebSocket
from fastapi.responses import HTMLResponse
from fastapi.middleware.cors import CORSMiddleware
import time


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
        time.sleep(2)
        await websocket.send_text(f"Test Response")