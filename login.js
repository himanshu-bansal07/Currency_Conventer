const loginForm = document.getElementById("loginForm");
const message = document.getElementById("message");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    try {
        const response = await fetch("users.json");

        if (!response.ok) {
            throw new Error("Failed to load users.json");
        }

        const users = await response.json();

        const validUser = users.find(user =>
            user.username === username &&
            user.password === password
        );

        if (validUser) {
            localStorage.setItem("loggedInUser", username);
            window.location.href = "dashboard.html";
        } else {
            message.textContent = "Invalid Username or Password";
        }

    } catch (error) {
        console.error(error);
        message.textContent = "Unable to load users.";
    }
});