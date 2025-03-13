document.getElementById("signupForm").addEventListener("submit", async (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await response.json();

    if (response.ok) {
        alert("Signup successful! Redirecting to login.");
        window.location.href = "login.html"; 
    } else {
        alert(data.error || "Signup failed. Try again.");
    }
});
