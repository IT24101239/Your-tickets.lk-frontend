document.addEventListener('DOMContentLoaded', function () {
    // Mobile menu functionality
    const menuButton = document.querySelector('.ri-menu-line');
    if (menuButton) {
        menuButton.addEventListener('click', function () {
            // Mobile menu functionality would go here
        });
    }

    // Search functionality
    const searchButton = document.getElementById('searchButton');
    const searchInput = document.getElementById('searchInput');
    const searchTooltip = document.getElementById('searchTooltip');
    const searchResults = document.getElementById('searchResults');
    
    if (searchButton && searchInput && searchTooltip && searchResults) {
        const resultsGrid = searchResults.querySelector('.grid');
        
        // Mock events data
        const mockEvents = [
            {
                title: "Summer Rock Festival",
                date: "May 15, 2025",
                time: "8:00 PM",
                venue: "Colombo Exhibition Center",
                price: "$25 - $75",
                image: "https://readdy.ai/api/search-image?query=rock%20concert%20with%20crowd%20and%20stage%20lights%2C%20professional%20photography%2C%20vibrant%20colors%2C%20high%20energy%20atmosphere&width=600&height=400&seq=1"
            },
            {
                title: "Classical Symphony Night",
                date: "June 5, 2025",
                time: "7:30 PM",
                venue: "National Performing Arts Theatre",
                price: "$30 - $90",
                image: "https://readdy.ai/api/search-image?query=classical%20orchestra%20performance%20in%20elegant%20concert%20hall%2C%20professional%20photography%2C%20warm%20lighting%2C%20formal%20setting&width=600&height=400&seq=2"
            },
            {
                title: "International Jazz Festival",
                date: "July 10-12, 2025",
                time: "Various Times",
                venue: "Galle Face Green",
                price: "$15 - $50",
                image: "https://readdy.ai/api/search-image?query=outdoor%20jazz%20festival%20with%20stage%20and%20audience%2C%20professional%20photography%2C%20evening%20setting%2C%20colorful%20stage%20lights&width=600&height=400&seq=3"
            },
            {
                title: "Stand-up Comedy Night",
                date: "August 20, 2025",
                time: "9:00 PM",
                venue: "Laugh Lounge",
                price: "$20",
                image: "https://readdy.ai/api/search-image?query=comedy%20club%20with%20stage%20and%20audience%2C%20professional%20photography%2C%20intimate%20setting%2C%20spotlight%20on%20stage&width=600&height=400&seq=4"
            }
        ];

        // Show tooltip when search is attempted with empty input
        function showTooltip() {
            searchTooltip.classList.remove('hidden');
            setTimeout(() => {
                searchTooltip.classList.add('hidden');
            }, 3000);
        }

        // Create HTML for event card
        function createEventCard(event) {
            return `
            <div class="event-card bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300">
                <div class="h-48 overflow-hidden">
                    <img src="${event.image}" alt="${event.title}" class="w-full h-full object-cover">
                </div>
                <div class="p-6">
                    <h3 class="text-xl font-semibold mb-2">${event.title}</h3>
                    <div class="flex items-center text-gray-500 mb-2">
                        <div class="w-4 h-4 flex items-center justify-center mr-2">
                            <i class="ri-calendar-line"></i>
                        </div>
                        <span>${event.date} • ${event.time}</span>
                    </div>
                    <div class="flex items-center text-gray-500 mb-4">
                        <div class="w-4 h-4 flex items-center justify-center mr-2">
                            <i class="ri-map-pin-line"></i>
                        </div>
                        <span>${event.venue}</span>
                    </div>
                    <div class="flex justify-between items-center">
                        <span class="font-semibold text-gray-800">${event.price}</span>
                        <button class="bg-primary text-white px-4 py-2 !rounded-button whitespace-nowrap hover:bg-opacity-90 transition-colors">Book Now</button>
                    </div>
                </div>
            </div>
            `;
        }

        // Filter events based on search query
        function filterEvents(query) {
            return mockEvents.filter(event =>
                event.title.toLowerCase().includes(query) ||
                event.venue.toLowerCase().includes(query)
            );
        }

        // Search button click handler
        searchButton.addEventListener('click', function () {
            const query = searchInput.value.trim().toLowerCase();
            if (!query) {
                showTooltip();
                return;
            }
            const filteredEvents = filterEvents(query);
            resultsGrid.innerHTML = filteredEvents.map(event => createEventCard(event)).join('');
            searchResults.classList.remove('hidden');
            searchResults.scrollIntoView({ behavior: 'smooth' });
        });

        // Enter key press in search input
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                searchButton.click();
            }
        });
    }

    // Password strength meter for auth page
    const passwordInput = document.getElementById('password');
    const strengthBar = document.getElementById('password-strength-bar');
    const strengthText = document.getElementById('password-strength-text');
    
    if (passwordInput && strengthBar && strengthText) {
        passwordInput.addEventListener('input', function() {
            const password = this.value;
            let strength = 0;
            
            if (password.length >= 8) strength += 1;
            if (password.match(/[a-z]+/)) strength += 1;
            if (password.match(/[A-Z]+/)) strength += 1;
            if (password.match(/[0-9]+/)) strength += 1;
            if (password.match(/[^a-zA-Z0-9]+/)) strength += 1;
            
            switch (strength) {
                case 0:
                    strengthBar.className = 'password-strength rounded-full';
                    strengthText.textContent = '';
                    break;
                case 1:
                    strengthBar.className = 'password-strength rounded-full strength-weak';
                    strengthText.textContent = 'Weak password';
                    strengthText.className = 'text-xs text-red-500 mt-1';
                    break;
                case 2:
                case 3:
                    strengthBar.className = 'password-strength rounded-full strength-medium';
                    strengthText.textContent = 'Medium password';
                    strengthText.className = 'text-xs text-yellow-500 mt-1';
                    break;
                case 4:
                    strengthBar.className = 'password-strength rounded-full strength-strong';
                    strengthText.textContent = 'Strong password';
                    strengthText.className = 'text-xs text-green-500 mt-1';
                    break;
                case 5:
                    strengthBar.className = 'password-strength rounded-full strength-very-strong';
                    strengthText.textContent = 'Very strong password';
                    strengthText.className = 'text-xs text-green-600 mt-1';
                    break;
            }
        });
    }
});
