import websocket
import json
import numpy as np
import talib
import pymongo
from datetime import datetime

# Connect to MongoDB Atlas
mongo_client = pymongo.MongoClient("mongodb+srv://deepgada2003:Deepesh1234@tbcluster.gxajf.mongodb.net/?retryWrites=true&w=majority&appName=tbcluster")
db = mongo_client["TradingBot"]  # Database
trades_collection = db["Trades"]  # Collection for storing trade details
portfolio_collection = db["Portfolio"]  # Collection for storing portfolio details

# Define Trading Pair and Timeframe
cc = 'btcusdt'
interval = '1m'

socket = f'wss://stream.binance.com:9443/ws/{cc}@kline_{interval}'
print(f"Connecting to: {socket}")

# Lists to store market data
closes = []
highs = []
lows = []

# Trading variables
portfolio = 10000  # Starting portfolio in USD
core_trade_amount = 500  # Fixed trade amount
core_quantity = 0
core_to_trade = True
money_end = 10000
real_time_portfolio_value = []
trade_count = 0  # Track number of trades
net_profit_loss = 0  # Track overall profit/loss

def buy(amount, price):
    global core_quantity, trade_count, net_profit_loss
    core_quantity += amount / price  # Convert USD to BTC
    trade_count += 1  # Increment trade count
    timestamp = datetime.utcnow()

    # Store trade details in MongoDB
    trade_data = {
        "trade_type": "BUY",
        "amount_usd": amount,
        "price": price,
        "btc_quantity": amount / price,
        "timestamp": timestamp,
        "trade_number": trade_count
    }
    trades_collection.insert_one(trade_data)
    print(f"Bought ${amount} worth of Bitcoin at price {price} at {timestamp}")

def sell(amount, price):
    global core_quantity, trade_count, net_profit_loss
    core_quantity -= amount / price  # Convert BTC to USD
    trade_count += 1  # Increment trade count
    timestamp = datetime.utcnow()
    
    # Calculate profit/loss from this trade
    profit_loss = amount - (amount / price * portfolio)
    net_profit_loss += profit_loss

    # Store trade details in MongoDB
    trade_data = {
        "trade_type": "SELL",
        "amount_usd": amount,
        "price": price,
        "btc_quantity": amount / price,
        "timestamp": timestamp,
        "trade_number": trade_count,
        "profit_loss": profit_loss
    }
    trades_collection.insert_one(trade_data)
    print(f"Sold ${amount} worth of Bitcoin at price {price} at {timestamp} with Profit/Loss: ${profit_loss}")

def on_message(ws, message):
    """Handles incoming messages from the WebSocket."""
    global portfolio, core_to_trade, core_quantity, real_time_portfolio_value, net_profit_loss

    json_messages = json.loads(message)  # Parse JSON string to Python dictionary
    candle = json_messages['k']  # Extract kline (candlestick) data
    is_candle_closed = candle['x']
    close = float(candle['c'])
    high = float(candle['h'])
    low = float(candle['l'])
    timestamp = datetime.utcnow()

    if is_candle_closed:
        closes.append(close)
        highs.append(high)
        lows.append(low)
        last_price = closes[-1]
        print(f"Closes: {closes}")



        if len(highs) > 14:  
            aroon = talib.AROONOSC(np.array(highs), np.array(lows), timeperiod=14)
            last_aroon = round(aroon[-1], 2)

            if last_aroon > 50: 
                if last_aroon > 50:  
                    print(f"📈 Bought ${core_trade_amount} worth of Bitcoin based on Aroon Indicator\n")

                elif last_aroon < -50: 
                    sell(core_trade_amount, price=closes[-1])
                    print(f"📉 Sold ${core_trade_amount} worth of Bitcoin based on Aroon Indicator\n")




        if len(highs) > 14:  # Ensure enough data points for Aroon calculation
            aroon = talib.AROONOSC(np.array(highs), np.array(lows), timeperiod=14)
            last_aroon = round(aroon[-1], 2)

            amt = last_aroon * core_trade_amount / 100
            port_value = portfolio * last_price - core_quantity * last_price
            trade_amt = amt - port_value

            RT_portfolio_value = money_end + port_value + core_quantity * last_price
            real_time_portfolio_value.append(float(RT_portfolio_value))

            print(f"The Last Aroon is {last_aroon} and recommended exposure is ${amt}")
            print(f"Real-Time Portfolio Value: ${RT_portfolio_value}\n")

            # Storing Portfolio Data in MongoDB
            portfolio_data = {
                "timestamp": timestamp,
                "portfolio_value": RT_portfolio_value,
                "net_profit_loss": net_profit_loss,
                "trade_count": trade_count,
                "current_bitcoin_holding": core_quantity
            }
            portfolio_collection.insert_one(portfolio_data)

            if trade_amt > 0:
                buy(trade_amt, price=last_price)
                print(f"We bought ${trade_amt} worth of Bitcoin\n")
            elif trade_amt < 0:
                sell(-trade_amt, price=last_price)
                print(f"We sold ${-trade_amt} worth of Bitcoin\n")

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

# Store Initial Portfolio Value in MongoDB
initial_portfolio_data = {
    "timestamp": datetime.utcnow(),
    "initial_portfolio_value": portfolio,
    "starting_cash": money_end,
    "starting_bitcoin_holding": core_quantity,
    "trade_count": 0,
    "net_profit_loss": 0
}
portfolio_collection.insert_one(initial_portfolio_data)
print("✅ Initial portfolio value stored in MongoDB.")


ws.run_forever()
