import asyncio
import websockets

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
    while True:
        message = await asyncio.to_thread(input, "Enter message to send: ")
        if connected_clients:
            await asyncio.gather(*[client.send(message) for client in connected_clients.copy()])
        else:
            print("No clients connected yet.")


async def main():
    """Starts the WebSocket server and terminal input handler."""
    server = await websockets.serve(handle_client, "localhost", 8001)
    print("WebSocket Server Started at ws://localhost:8001")

    # Start the message sender in a separate task
    asyncio.create_task(send_messages())

    await server.wait_closed()  # Keep the server running

if __name__ == "__main__":
    asyncio.run(main())
