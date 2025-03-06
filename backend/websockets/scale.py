import websocket
import json
import numpy as np
import pandas as pd
import mplfinance as mpf
import matplotlib.pyplot as plt
from datetime import datetime
from matplotlib.animation import FuncAnimation

# Define Trading Pair and Timeframe
cc = 'btcusdt'
interval = '1m'
socket = f'wss://stream.binance.com:9443/ws/{cc}@kline_{interval}'

# Store market data for candlesticks
candlestick_data = []
fixed_candle_count = 50  # Number of candles to display at a time

# Setup Matplotlib Figure
plt.style.use("dark_background")
fig, ax = plt.subplots(figsize=(12, 6))  # Wider figure for better visualization

# Function to Calculate Support & Resistance
def calculate_support_resistance(df):
    """Finds recent support & resistance levels dynamically."""
    if len(df) < 20:
        return None, None  # Not enough data

    recent_highs = df["High"].rolling(window=20).max().iloc[-1]  # Last 20 candles' max (resistance)
    recent_lows = df["Low"].rolling(window=20).min().iloc[-1]    # Last 20 candles' min (support)
    
    return recent_lows, recent_highs

# Function to Update Candlestick Chart with Sliding Window Effect
def update_chart(i):
    if len(candlestick_data) < 2:
        return

    df = pd.DataFrame(candlestick_data, columns=["Time", "Open", "High", "Low", "Close"])
    df["Time"] = pd.to_datetime(df["Time"], unit='ms')  # Convert timestamps

    ax.clear()  # Clear previous graph
    
    # Keep only last 50 candles to create the sliding effect
    df = df.iloc[-fixed_candle_count:]

    # Plot Candlesticks
    mpf.plot(df.set_index("Time"), type="candle", ax=ax, style="charles", volume=False)

    # Calculate Support & Resistance
    support, resistance = calculate_support_resistance(df)

    # Plot Support & Resistance Lines
    if support:
        ax.axhline(y=support, color="green", linestyle="--", alpha=0.8, linewidth=1.5, label="Support")
    if resistance:
        ax.axhline(y=resistance, color="red", linestyle="--", alpha=0.8, linewidth=1.5, label="Resistance")

    if support or resistance:
        ax.legend()

    ax.set_title("📊 Live BTC/USDT Candlestick Chart (Sliding View)", fontsize=14, fontweight="bold", color="white")
    ax.set_ylabel("Price (USDT)", fontsize=12, color="white")
    ax.grid(True, linestyle="--", alpha=0.6)

# WebSocket Message Handler
def on_message(ws, message):
    global candlestick_data

    json_message = json.loads(message)
    candle = json_message['k']
    timestamp = candle['t']
    is_candle_closed = candle['x']
    open_price = float(candle['o'])
    high_price = float(candle['h'])
    low_price = float(candle['l'])
    close_price = float(candle['c'])

    if is_candle_closed:
        candlestick_data.append([timestamp, open_price, high_price, low_price, close_price])
        if len(candlestick_data) > fixed_candle_count:  # Ensure only the last 50 candles are kept
            candlestick_data.pop(0)  #

# WebSocket Connection Handlers
def on_open(ws):
    print("### Connection Opened ###")

def on_close(ws, close_status_code, close_msg):
    print("### WebSocket Closed ###")

# Create WebSocket Connection
ws = websocket.WebSocketApp(socket, 
                            on_open=on_open,
                            on_message=on_message,
                            on_close=on_close)

# Run WebSocket in Background
import threading
thread = threading.Thread(target=ws.run_forever, daemon=True)
thread.start()

# Start Real-time Graph Updates with Sliding Window
ani = FuncAnimation(fig, update_chart, interval=1000)  # Updates every second
plt.show()
