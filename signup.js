const passwordInput = document.getElementById('Password');
const confirmInput = document.getElementById('PasswordConfirm');
const strengthBar = document.getElementById('strength-bar');
const form = document.getElementById('signup-form');


// Password strength checker
passwordInput.addEventListener('input', function() {
    const password = this.value;
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    
    strengthBar.className = 'password-strength-bar';
    if (strength <= 1) {
        strengthBar.classList.add('weak');
    } else if (strength <= 3) {
        strengthBar.classList.add('medium');
    } else {
        strengthBar.classList.add('strong');
    }
});

// Password match checker
confirmInput.addEventListener('input', function() {
    if (this.value === '') {
        this.classList.remove('match', 'no-match');
    } else if (this.value === passwordInput.value) {
        this.classList.add('match');
        this.classList.remove('no-match');
    } else {
        this.classList.add('no-match');
        this.classList.remove('match');
    }
});

// Form validation
form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (passwordInput.value !== confirmInput.value) {
        alert('Passwords do not match!');
        return;
    }
    
    if (passwordInput.value.length < 8) {
        alert('Password must be at least 8 characters long!');
        return;
    }

    // Form is valid - proceed with submission
    console.log('Form submitted successfully!');
    window.location.href = "dashboard.html";
    // Add your form submission logic here
});

function signup(username, password) {
    const users = JSON.parse(localStorage.getItem("users") || "[]")
    if(users.some(user=> user.username === username)) {
        throw new Error("Username already exists")
    }

    users.push({
        id:crypto.randomUUID(),
        username: username,
        password: password
    })

    localStorage.setItem(JSON.stringify(users))
}