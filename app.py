from flask import Flask, request, jsonify
import ccxt

app = Flask(__name__)

# 🔐 Your Binance API key and secret go here
exchange = ccxt.binance({
    'apiKey':"aPQ7CEmlgNmh0cfJwJoyiAIei5n4BK6JRw6L48PGruE1fI9CDIlEsJ6oYKlxjlKP",
    'secret':"5sgq0yffucrRU6fZbt28XcP45lJwHR26c70ywJDH3KasIxMRYsCkEzvCVutEvRjT",
    'enableRateLimit': True,
})

@app.route("/price")
def price():
    symbol = request.args.get("symbol", "BTC/USDT")
    ticker = exchange.fetch_ticker(symbol)
    return jsonify({"symbol": symbol, "price": ticker['last']})

@app.route("/order", methods=["POST"])
def order():
    data = request.json
    symbol = data["symbol"]
    side = data["side"]
    amount = float(data["amount"])
    order = exchange.create_order(symbol, "market", side, amount)
    return jsonify(order)

if __name__ == "__main__":
    app.run()
