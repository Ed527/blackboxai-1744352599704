// Check authentication status
function checkAuth() {
    const isAuthenticated = localStorage.getItem('nsmq_auth');
    if (!isAuthenticated && !window.location.href.includes('auth.html')) {
        window.location.href = 'auth.html';
    }
}

// Handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Simple validation
    if (!email || !password) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    // In a real app, this would make an API call to authenticate
    localStorage.setItem('nsmq_auth', 'true');
    localStorage.setItem('trial_start', new Date().toISOString());
    window.location.href = 'index.html';
}

// Handle signup
function handleSignup(event) {
    event.preventDefault();
    const username = document.getElementById('signup-username').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    // Simple validation
    if (!username || !email || !password || !confirmPassword) {
        showAlert('Please fill in all fields', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert('Passwords do not match', 'error');
        return;
    }

    // In a real app, this would make an API call to create account
    localStorage.setItem('nsmq_auth', 'true');
    localStorage.setItem('trial_start', new Date().toISOString());
    window.location.href = 'index.html';
}

// Handle logout
function handleLogout() {
    localStorage.removeItem('nsmq_auth');
    window.location.href = 'auth.html';
}

// Check trial status
function checkTrialStatus() {
    const trialStart = localStorage.getItem('trial_start');
    if (trialStart) {
        const startDate = new Date(trialStart);
        const now = new Date();
        const trialDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        
        if (trialDays >= 30) {
            // Trial expired
            showPremiumPrompt();
        } else {
            // Update trial days remaining
            const daysRemaining = 30 - trialDays;
            updateTrialBadge(daysRemaining);
        }
    }
}

// Show premium prompt
function showPremiumPrompt() {
    const premiumPrompt = document.createElement('div');
    premiumPrompt.className = 'fixed bottom-0 left-0 right-0 bg-nsmq-blue text-white p-4';
    premiumPrompt.innerHTML = `
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <p>Your free trial has expired. Upgrade to premium to continue accessing all features.</p>
            <a href="premium.html" class="bg-nsmq-gold text-nsmq-blue px-6 py-2 rounded-lg font-semibold hover:bg-yellow-400">
                Upgrade Now
            </a>
        </div>
    `;
    document.body.appendChild(premiumPrompt);
}

// Update trial badge
function updateTrialBadge(daysRemaining) {
    const trialBadge = document.getElementById('trialBadge');
    if (trialBadge) {
        trialBadge.textContent = `${daysRemaining} days left in trial`;
    }
}

// Show alert message
function showAlert(message, type = 'success') {
    const alert = document.createElement('div');
    alert.className = `fixed top-4 right-4 p-4 rounded-lg ${
        type === 'error' ? 'bg-red-500' : 'bg-green-500'
    } text-white`;
    alert.textContent = message;
    document.body.appendChild(alert);
    
    setTimeout(() => {
        alert.remove();
    }, 3000);
}

// Search functionality
function handleSearch(event) {
    const searchTerm = event.target.value.toLowerCase();
    const searchResults = document.getElementById('searchResults');
    
    if (searchTerm.length < 2) {
        searchResults.innerHTML = '';
        return;
    }

    // In a real app, this would make an API call to search
    // For now, we'll use dummy data
    const results = [
        { type: 'topic', title: 'Electromagnetic Induction' },
        { type: 'formula', title: 'F = ma (Newton\'s Second Law)' },
        { type: 'question', title: 'Calculate the force needed to...' }
    ].filter(item => item.title.toLowerCase().includes(searchTerm));

    displaySearchResults(results);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = results.map(result => `
        <div class="p-2 hover:bg-gray-100 cursor-pointer">
            <div class="flex items-center">
                <i class="fas fa-${result.type === 'topic' ? 'book' : result.type === 'formula' ? 'square-root-alt' : 'question'} text-nsmq-blue mr-2"></i>
                <span>${result.title}</span>
            </div>
        </div>
    `).join('');
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    checkAuth();
    checkTrialStatus();
    
    // Add event listeners
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }

    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});
