import websocket
import json

cc = 'btcusdt'
interval = '1m'

socket = f'wss://stream.binance.com:9443/ws/{cc}@kline_{interval}'
print(f"Connecting to: {socket}")

closes=[]
highs=[]
lows=[]

def on_message(ws, message):
    """Handles incoming messages from the WebSocket."""
    json_messages = json.loads(message)  # Parse JSON string to Python dictionary
    candle = json_messages['k']  # Extract kline (candlestick) data
    is_candle_closed=candle['x']
    close=candle['c']
    high=candle['h']
    low=candle['l']
    vol=candle['v']

    # print(close)
    # print(high)
    # print(low)
    # print(vol)

    if is_candle_closed:
        closes.append(close)
        highs.append(high)
        lows.append(low)
        print(f"Close: {close}, High: {high}, Low: {low}")

    

def on_close(ws, close_status_code, close_msg):
    """Handles WebSocket closure."""
    print("### WebSocket Closed ###")

def on_open(ws):
    """Handles WebSocket opening."""
    print("### Connection Opened ###")

# Create and run WebSocket connection
ws = websocket.WebSocketApp(socket, 
                            on_open=on_open,
                            on_message=on_message,
                            on_close=on_close)

ws.run_forever()
