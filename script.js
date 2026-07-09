// Simple fake auth (localStorage)
function register() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if(localStorage.getItem(user)) {
    alert("User already exists!");
  } else {
    localStorage.setItem(user, pass);
    alert("Account created! Please login.");
  }
}

function login() {
  let user = document.getElementById("username").value;
  let pass = document.getElementById("password").value;
  if(localStorage.getItem(user) === pass) {
    alert("Welcome " + user);
    document.getElementById("auth").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
  } else {
    alert("Invalid credentials");
  }
}

// Fetch live crypto price from Binance API
async function fetchPrice() {
  let symbol = document.getElementById("symbol").value;
  let res = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`);
  let data = await res.json();
  document.getElementById("price").innerText = `Latest Price: ${data.price} USDT`;
}

// Portfolio calculation
async function calcPortfolio() {
  let btc = parseFloat(document.getElementById("btc").value) || 0;
  let eth = parseFloat(document.getElementById("eth").value) || 0;
  let bnb = parseFloat(document.getElementById("bnb").value) || 0;

  let btcPrice = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT`).then(r=>r.json());
  let ethPrice = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=ETHUSDT`).then(r=>r.json());
  let bnbPrice = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=BNBUSDT`).then(r=>r.json());

  let total = btc*btcPrice.price + eth*ethPrice.price + bnb*bnbPrice.price;
  document.getElementById("portfolio").innerText = `Total Value: ${total.toFixed(2)} USDT`;
}
