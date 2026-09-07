const loginForm = document.querySelector('form');

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevents GET query params from being added to the URL
        
        const usernameInput = document.getElementById('Username');
        const passwordInput = document.getElementById('Password');

        if (!usernameInput.value.trim()) {
            alert('Please enter your username');
            return;
        }

        if (!passwordInput.value) {
            alert('Please enter your password');
            return;
        }

        // Navigate cleanly to the dashboard without query parameters
        window.location.href = "dashboard.html";
    });
}
