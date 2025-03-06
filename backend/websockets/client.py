import asyncio
import websockets

async def send_messages():
    uri = "ws://localhost:8000"
    async with websockets.connect(uri) as websocket:
        while True:
            message = input("Enter message: ")  # Type message in terminal
            await websocket.send(message)  # Send message to WebSocket server

asyncio.get_event_loop().run_until_complete(send_messages())
