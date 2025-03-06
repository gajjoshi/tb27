import asyncio
import websockets
import sys

connected_clients = set()

async def handle_client(websocket, path):
    """Handles new client connections and incoming messages."""
    connected_clients.add(websocket)
    try:
        async for message in websocket:
            print(f"Received from client: {message}")
            # Broadcast the message to all connected clients
            for client in connected_clients.copy():
                if client != websocket:
                    await client.send(message)
    except websockets.exceptions.ConnectionClosed:
        print("Client disconnected")
    finally:
        connected_clients.remove(websocket)

async def send_messages():
    """Allows sending messages from the terminal to all clients."""
    loop = asyncio.get_event_loop()
    while True:
        message = await loop.run_in_executor(None, sys.stdin.readline)
        message = message.strip()  # Remove newline characters
        if message:
            if connected_clients:
                await asyncio.gather(*[client.send(message) for client in connected_clients.copy()])
            else:
                print("No clients connected yet.")

async def main():
    """Starts the WebSocket server and terminal input handler."""
    server = await websockets.serve(handle_client, "0.0.0.0", 8001)
    print("WebSocket Server Started on ws://0.0.0.0:8001")
    
    # Run both the WebSocket server and input handling in parallel
    await asyncio.gather(server.wait_closed(), send_messages())

if __name__ == "__main__":
    asyncio.run(main())
