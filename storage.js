const saveBtn = document.getElementById("saveBtn");
const favoritesList = document.getElementById("favoritesList");

// Load favorites when page opens
window.addEventListener("load", loadFavorites);

// Save favorite pair
saveBtn.addEventListener("click", saveFavorite);

function saveFavorite() {

    const cryptoValue = document.getElementById("crypto").value;
    const currencyValue = document.getElementById("currency").value;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    const pair = `${cryptoValue.toUpperCase()} → ${currencyValue.toUpperCase()}`;

    if (!favorites.includes(pair)) {
        favorites.push(pair);
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }

    loadFavorites();
}

function loadFavorites() {

    favoritesList.innerHTML = "";

    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favorites.forEach((pair, index) => {

        const li = document.createElement("li");

        li.innerHTML = `
            ⭐ ${pair}
            <button class="deleteBtn" data-index="${index}">
                Delete
            </button>
        `;

        favoritesList.appendChild(li);

    });

    addDeleteEvents();

}

function addDeleteEvents() {

    const deleteButtons = document.querySelectorAll(".deleteBtn");

    deleteButtons.forEach(button => {

        button.addEventListener("click", function () {

            let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

            favorites.splice(this.dataset.index, 1);

            localStorage.setItem("favorites", JSON.stringify(favorites));

            loadFavorites();

        });

    });

}