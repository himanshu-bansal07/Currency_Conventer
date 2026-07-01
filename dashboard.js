const welcomeUser = document.getElementById("welcomeUser");

const crypto = document.getElementById("crypto");
const currency = document.getElementById("currency");
const amount = document.getElementById("amount");

const convertBtn = document.getElementById("convertBtn");

const currentPrice = document.getElementById("currentPrice");
const convertedAmount = document.getElementById("convertedAmount");

// Display logged in user
const username = localStorage.getItem("loggedInUser");

if (username) {
    welcomeUser.textContent = `Welcome, ${username}`;
} else {
    window.location.href = "index.html";
}

convertBtn.addEventListener("click", getPrice);

async function getPrice() {

    const selectedCrypto = crypto.value;
    const selectedCurrency = currency.value;
    const enteredAmount = Number(amount.value);

    if (enteredAmount <= 0 || isNaN(enteredAmount)) {
        alert("Please enter a valid amount.");
        return;
    }

    const url =
        `https://api.coingecko.com/api/v3/simple/price?ids=${selectedCrypto}&vs_currencies=${selectedCurrency}`;

    try {

        const response = await fetch(url);

        const data = await response.json();

        const price = data[selectedCrypto][selectedCurrency];

        currentPrice.textContent =
            `1 ${selectedCrypto.toUpperCase()} = ${price} ${selectedCurrency.toUpperCase()}`;

        const total = enteredAmount * price;

        convertedAmount.textContent =
            `${enteredAmount} ${selectedCrypto.toUpperCase()} = ${total.toLocaleString()} ${selectedCurrency.toUpperCase()}`;

    }

    catch (error) {

        console.log(error);

        alert("Unable to fetch live price.");

    }

}