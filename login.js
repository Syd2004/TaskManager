const loginForm = document.querySelector('form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents GET query params from being added to the URL
        
        const usernameInput = document.getElementById('Username');
        const passwordInput = document.getElementById('Password');

        if (!usernameInput.value.trim()) {
            alert('Please enter your email');
            return;
        }

        if (!passwordInput.value) {
            alert('Please enter your password');
            return;
        }

        login(usernameInput.value, passwordInput.value)
    });
}

function login(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")

    const user = users.find(user => 
        user.username === username &&
        user.password === password
    )

    if(!user) {alert("Invalid username or password!"); return}
    localStorage.setItem("currentUser", user.id)
    window.location.href = "/dashboard.html"
}