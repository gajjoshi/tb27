from tronpy import Tron
from tronpy.providers import HTTPProvider
from flask import Flask, request, jsonify
import qrcode
import base64
from io import BytesIO
import urllib.parse

# Tron network setup with your TronGrid API key
client = Tron(provider=HTTPProvider(api_key="1209c146-3082-4265-9400-8a11e5ac9046"))

# USDT TRC20 Contract Address
USDT_CONTRACT_ADDRESS = "0xa614f803B6FD780986A42c78Ec9c7f77e6DeD13C"

# Your receiving wallet address
RECEIVER_ADDRESS = "TX27wZAc3WmNcPJqX7guaxHLcjGySBQrzU"

app = Flask(__name__)

@app.route('/create_payment', methods=['POST'])
def create_payment():
    """Create a payment request with QR code and universal wallet link."""
    data = request.json
    amount = data.get('amount')

    if not amount:
        return jsonify({"error": "Amount is required"}), 400

    # Create payment data string
    payment_data = f"tron:{RECEIVER_ADDRESS}?amount={amount}&token=USDT"

    # Generate QR code
    qr = qrcode.make(payment_data)
    buffer = BytesIO()
    qr.save(buffer, format="PNG")
    qr_base64 = base64.b64encode(buffer.getvalue()).decode()

    # Universal wallet link (TronScan or Pay.TronLink)
    wallet_link = f"https://pay.tronlink.org/#/transaction?to={RECEIVER_ADDRESS}&amount={amount}&token=USDT"

    return jsonify({
        "payment_address": RECEIVER_ADDRESS,
        "amount": amount,
        "message": "Send the exact amount of USDT to this address.",
        "qr_code": f"data:image/png;base64,{qr_base64}",
        "wallet_link": wallet_link
    })

@app.route('/check_payment', methods=['GET'])
def check_payment():
    """Check if the payment has been received."""
    contract = client.get_contract(USDT_CONTRACT_ADDRESS)
    balance = contract.functions.balanceOf(RECEIVER_ADDRESS)
    balance = balance / 10**6

    return jsonify({"usdt_balance": balance})

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
