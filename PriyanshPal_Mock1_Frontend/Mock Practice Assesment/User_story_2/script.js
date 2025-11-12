/* ===================================
   User Story 2: JavaScript Dashboard
   ES6 Features & Fetch API Implementation
   WITH FALLBACK FOR FILE ACCESS ISSUES
   =================================== */

// ES6: const and let declarations
const API_URL = './events.json';
let allEvents = [];
let filteredEvents = [];

// INLINE DATA FALLBACK (if fetch fails)
const FALLBACK_DATA = {
    "events": [
        {
            "id": 1,
            "title": "Tech Innovation Summit 2024",
            "category": "conference",
            "date": "2024-12-15",
            "location": "New York Convention Center",
            "description": "Join industry leaders and innovators for a day of cutting-edge technology discussions, networking, and insights into the future of tech.",
            "attendees": 450,
            "maxAttendees": 500,
            "status": "open",
            "rating": 4.8,
            "organizer": "TechHub Global"
        },
        {
            "id": 2,
            "title": "Digital Marketing Masterclass",
            "category": "workshop",
            "date": "2024-12-20",
            "location": "Online Platform",
            "description": "Learn advanced digital marketing strategies from industry experts. Covers SEO, social media, content marketing, and analytics.",
            "attendees": 180,
            "maxAttendees": 200,
            "status": "closing",
            "rating": 4.6,
            "organizer": "Marketing Academy"
        },
        {
            "id": 3,
            "title": "Business Networking Gala",
            "category": "networking",
            "date": "2025-01-10",
            "location": "Grand Hotel Los Angeles",
            "description": "Connect with entrepreneurs, investors, and business professionals in an elegant evening of networking and opportunities.",
            "attendees": 300,
            "maxAttendees": 300,
            "status": "full",
            "rating": 4.9,
            "organizer": "Business Connect Inc."
        },
        {
            "id": 4,
            "title": "AI & Machine Learning Webinar",
            "category": "webinar",
            "date": "2024-11-28",
            "location": "Virtual Event",
            "description": "Explore the latest developments in artificial intelligence and machine learning. Perfect for beginners and professionals alike.",
            "attendees": 520,
            "maxAttendees": 1000,
            "status": "open",
            "rating": 4.7,
            "organizer": "AI Institute"
        },
        {
            "id": 5,
            "title": "Startup Pitch Competition",
            "category": "conference",
            "date": "2024-12-05",
            "location": "Silicon Valley Arena",
            "description": "Watch innovative startups pitch their ideas to top investors. Networking session and startup expo included.",
            "attendees": 350,
            "maxAttendees": 400,
            "status": "open",
            "rating": 4.5,
            "organizer": "Venture Capital Network"
        },
        {
            "id": 6,
            "title": "UX/UI Design Workshop",
            "category": "workshop",
            "date": "2024-12-18",
            "location": "Design Studio Chicago",
            "description": "Hands-on workshop covering user experience and interface design principles. Bring your laptop for practical exercises.",
            "attendees": 45,
            "maxAttendees": 50,
            "status": "closing",
            "rating": 4.9,
            "organizer": "Creative Minds Academy"
        },
        {
            "id": 7,
            "title": "Blockchain & Cryptocurrency Summit",
            "category": "conference",
            "date": "2025-01-15",
            "location": "Miami Convention Center",
            "description": "Deep dive into blockchain technology, cryptocurrencies, DeFi, and NFTs with industry pioneers and investors.",
            "attendees": 680,
            "maxAttendees": 800,
            "status": "open",
            "rating": 4.6,
            "organizer": "Crypto Global"
        },
        {
            "id": 8,
            "title": "Women in Tech Networking",
            "category": "networking",
            "date": "2024-12-12",
            "location": "Tech Hub Seattle",
            "description": "Empowering women in technology through networking, mentorship, and inspiring talks from female tech leaders.",
            "attendees": 150,
            "maxAttendees": 200,
            "status": "open",
            "rating": 4.8,
            "organizer": "Women Tech Alliance"
        },
        {
            "id": 9,
            "title": "Cloud Computing Seminar",
            "category": "seminar",
            "date": "2024-11-25",
            "location": "Cloud Center Austin",
            "description": "Comprehensive seminar on cloud computing platforms, migration strategies, and best practices for modern businesses.",
            "attendees": 120,
            "maxAttendees": 150,
            "status": "open",
            "rating": 4.4,
            "organizer": "Cloud Solutions Group"
        },
        {
            "id": 10,
            "title": "Data Science Bootcamp",
            "category": "workshop",
            "date": "2024-12-22",
            "location": "Online + Hybrid",
            "description": "Intensive 3-day bootcamp covering Python, data analysis, visualization, and machine learning fundamentals.",
            "attendees": 95,
            "maxAttendees": 100,
            "status": "closing",
            "rating": 4.7,
            "organizer": "Data Academy"
        },
        {
            "id": 11,
            "title": "Cybersecurity Conference 2024",
            "category": "conference",
            "date": "2025-01-20",
            "location": "Washington DC Convention",
            "description": "Leading cybersecurity experts discuss emerging threats, defense strategies, and the future of digital security.",
            "attendees": 410,
            "maxAttendees": 500,
            "status": "open",
            "rating": 4.8,
            "organizer": "CyberSafe International"
        },
        {
            "id": 12,
            "title": "Freelance Success Webinar",
            "category": "webinar",
            "date": "2024-12-08",
            "location": "Online Event",
            "description": "Learn how to build a successful freelance career. Topics include client acquisition, pricing, and work-life balance.",
            "attendees": 280,
            "maxAttendees": 500,
            "status": "open",
            "rating": 4.5,
            "organizer": "Freelancer's Hub"
        },
        {
            "id": 13,
            "title": "Mobile App Development Workshop",
            "category": "workshop",
            "date": "2024-12-28",
            "location": "Tech Center Boston",
            "description": "Build your first mobile app using React Native. Perfect for developers with basic JavaScript knowledge.",
            "attendees": 60,
            "maxAttendees": 75,
            "status": "open",
            "rating": 4.6,
            "organizer": "Mobile Dev Academy"
        },
        {
            "id": 14,
            "title": "Investment & Finance Networking",
            "category": "networking",
            "date": "2025-01-05",
            "location": "Wall Street Club New York",
            "description": "Exclusive networking event for investors, financial analysts, and finance professionals.",
            "attendees": 200,
            "maxAttendees": 200,
            "status": "full",
            "rating": 4.7,
            "organizer": "Finance Network Pro"
        },
        {
            "id": 15,
            "title": "E-commerce Growth Strategies",
            "category": "seminar",
            "date": "2024-12-14",
            "location": "Commerce Center Denver",
            "description": "Learn proven strategies to scale your e-commerce business. Topics include SEO, conversion optimization, and customer retention.",
            "attendees": 140,
            "maxAttendees": 180,
            "status": "open",
            "rating": 4.5,
            "organizer": "E-commerce Experts"
        }
    ]
};

// DOM Elements using destructuring
const {
    categoryFilter,
    dateFilter,
    statusFilter,
    resetFilters,
    eventsContainer,
    loadingIndicator,
    errorMessage,
    errorText,
    retryBtn,
    noEventsMessage,
    eventCount,
    totalEvents,
    activeEvents,
    totalAttendees,
    avgRating
} = {
    categoryFilter: document.getElementById('categoryFilter'),
    dateFilter: document.getElementById('dateFilter'),
    statusFilter: document.getElementById('statusFilter'),
    resetFilters: document.getElementById('resetFilters'),
    eventsContainer: document.getElementById('eventsContainer'),
    loadingIndicator: document.getElementById('loadingIndicator'),
    errorMessage: document.getElementById('errorMessage'),
    errorText: document.getElementById('errorText'),
    retryBtn: document.getElementById('retryBtn'),
    noEventsMessage: document.getElementById('noEventsMessage'),
    eventCount: document.getElementById('eventCount'),
    totalEvents: document.getElementById('totalEvents'),
    activeEvents: document.getElementById('activeEvents'),
    totalAttendees: document.getElementById('totalAttendees'),
    avgRating: document.getElementById('avgRating')
};

// ES6: Arrow Function - Initialize App
const init = () => {
    console.log('🚀 Initializing Event Dashboard...');
    fetchEvents();
    attachEventListeners();
};

// ES6: Async/Await - Fetch Events with Error Handling
const fetchEvents = async () => {
    try {
        showLoading(true);
        hideError();
        
        console.log('📡 Attempting to fetch events from API...');
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        try {
            const response = await fetch(API_URL);
            
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            
            const data = await response.json();
            allEvents = data.events;
            console.log('✅ Successfully loaded events from API');
            
        } catch (fetchError) {
            console.warn('⚠️ Could not fetch from API, using fallback data');
            console.warn('Error:', fetchError.message);
            console.log('💡 TIP: Use a local server (Live Server or python -m http.server)');
            
            // Use fallback data
            allEvents = FALLBACK_DATA.events;
        }
        
        filteredEvents = [...allEvents]; // ES6: Spread operator
        
        console.log(`✅ Loaded ${allEvents.length} events successfully`);
        
        displayEvents(filteredEvents);
        updateStatistics(filteredEvents);
        showLoading(false);
        
    } catch (error) {
        console.error('❌ Critical error:', error);
        showError(`Failed to load events: ${error.message}`);
        showLoading(false);
    }
};

// ES6: Arrow Function - Display Events with Array Methods
const displayEvents = (events) => {
    eventsContainer.innerHTML = '';
    
    if (events.length === 0) {
        noEventsMessage.style.display = 'block';
        eventCount.textContent = '0 events';
        return;
    }
    
    noEventsMessage.style.display = 'none';
    eventCount.textContent = `${events.length} event${events.length !== 1 ? 's' : ''}`;
    
    // ES6: forEach with arrow function
    events.forEach((event, index) => {
        const eventCard = createEventCard(event, index);
        eventsContainer.appendChild(eventCard);
    });
    
    console.log(`📊 Displayed ${events.length} events`);
};

// ES6: Template Literals & Destructuring - Create Event Card
const createEventCard = (event, index) => {
    // ES6: Object Destructuring
    const {
        id,
        title,
        category,
        date,
        location,
        description,
        attendees,
        maxAttendees,
        status,
        rating,
        organizer
    } = event;
    
    const card = document.createElement('div');
    card.className = 'event-card';
    card.style.animationDelay = `${index * 0.1}s`;
    
    // ES6: Template Literals
    card.innerHTML = `
        <div class="event-header">
            <span class="event-category">${category}</span>
            <h3 class="event-title">${title}</h3>
            <div class="event-date">📅 ${formatDate(date)}</div>
        </div>
        <div class="event-body">
            <p class="event-description">${description}</p>
            <div class="event-details">
                <div class="event-detail">📍 ${location}</div>
                <div class="event-detail">👥 ${attendees}/${maxAttendees} attendees</div>
                <div class="event-detail">👤 Organized by ${organizer}</div>
            </div>
        </div>
        <div class="event-footer">
            <span class="event-status status-${status}">${getStatusText(status)}</span>
            <div class="event-rating">⭐ ${rating.toFixed(1)}</div>
        </div>
    `;
    
    return card;
};

// ES6: Arrow Function - Format Date
const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// ES6: Arrow Function with Switch - Get Status Text
const getStatusText = (status) => {
    switch(status) {
        case 'open':
            return 'Open for Registration';
        case 'closing':
            return 'Closing Soon';
        case 'full':
            return 'Fully Booked';
        default:
            return 'Unknown';
    }
};

// ES6: Arrow Function with Array Methods - Update Statistics
const updateStatistics = (events) => {
    // ES6: Array methods - reduce, filter, map
    const total = events.length;
    const active = events.filter(e => e.status === 'open').length;
    const attendeesCount = events.reduce((sum, e) => sum + e.attendees, 0);
    const avgRatingValue = events.reduce((sum, e) => sum + e.rating, 0) / total;
    
    // Update DOM with animation
    animateValue(totalEvents, 0, total, 1000);
    animateValue(activeEvents, 0, active, 1000);
    animateValue(totalAttendees, 0, attendeesCount, 1000);
    avgRating.textContent = avgRatingValue.toFixed(1);
    
    console.log(`📈 Statistics updated - Total: ${total}, Active: ${active}`);
};

// ES6: Arrow Function - Animate Numbers
const animateValue = (element, start, end, duration) => {
    const range = end - start;
    const increment = range / (duration / 16);
    let current = start;
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= end) {
            element.textContent = Math.round(end);
            clearInterval(timer);
        } else {
            element.textContent = Math.round(current);
        }
    }, 16);
};

// ES6: Arrow Function - Filter Events
const filterEvents = () => {
    const category = categoryFilter.value;
    const date = dateFilter.value;
    const status = statusFilter.value;
    
    console.log(`🔍 Filtering - Category: ${category}, Date: ${date}, Status: ${status}`);
    
    // ES6: Array filter method with arrow functions
    filteredEvents = allEvents.filter(event => {
        const matchCategory = category === 'all' || event.category === category;
        const matchDate = date === 'all' || checkDateFilter(event.date, date);
        const matchStatus = status === 'all' || event.status === status;
        
        return matchCategory && matchDate && matchStatus;
    });
    
    displayEvents(filteredEvents);
    updateStatistics(filteredEvents);
};

// ES6: Arrow Function - Check Date Filter
const checkDateFilter = (eventDate, filter) => {
    const today = new Date();
    const event = new Date(eventDate);
    
    switch(filter) {
        case 'today':
            return event.toDateString() === today.toDateString();
        case 'week':
            const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            return event >= today && event <= weekFromNow;
        case 'month':
            const monthFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
            return event >= today && event <= monthFromNow;
        case 'upcoming':
            return event >= today;
        default:
            return true;
    }
};

// ES6: Arrow Function - Reset Filters
const resetAllFilters = () => {
    console.log('🔄 Resetting all filters...');
    categoryFilter.value = 'all';
    dateFilter.value = 'all';
    statusFilter.value = 'all';
    
    filteredEvents = [...allEvents];
    displayEvents(filteredEvents);
    updateStatistics(filteredEvents);
};

// ES6: Arrow Function - Attach Event Listeners
const attachEventListeners = () => {
    categoryFilter.addEventListener('change', filterEvents);
    dateFilter.addEventListener('change', filterEvents);
    statusFilter.addEventListener('change', filterEvents);
    resetFilters.addEventListener('click', resetAllFilters);
    retryBtn.addEventListener('click', fetchEvents);
    
    console.log('✅ Event listeners attached');
};

// Utility Functions
const showLoading = (show) => {
    loadingIndicator.style.display = show ? 'block' : 'none';
};

const showError = (message) => {
    errorText.textContent = message;
    errorMessage.style.display = 'block';
};

const hideError = () => {
    errorMessage.style.display = 'none';
};

// ES6: Demonstrating Variable Hoisting (logged before declaration)
console.log('🔧 Variable hoisting demo - hoistedVar:', typeof hoistedVar); // undefined
var hoistedVar = 'This demonstrates hoisting';

// ES6: Function Hoisting Demo
console.log('🔧 Function hoisting demo:', hoistedFunction()); // Works!
function hoistedFunction() {
    return 'Function declarations are hoisted!';
}

// ES6: Array Methods Demo - Map
const demoMap = () => {
    const numbers = [1, 2, 3, 4, 5];
    const doubled = numbers.map(num => num * 2);
    console.log('📚 Map demo - Doubled numbers:', doubled);
};

// ES6: Array Methods Demo - Filter
const demoFilter = () => {
    const numbers = [1, 2, 3, 4, 5, 6];
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    console.log('📚 Filter demo - Even numbers:', evenNumbers);
};

// ES6: Array Methods Demo - ForEach
const demoForEach = () => {
    const items = ['Conference', 'Workshop', 'Networking'];
    console.log('📚 ForEach demo - Event types:');
    items.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item}`);
    });
};

// Run demonstrations
demoMap();
demoFilter();
demoForEach();

// ES6: Constructor Demo
class EventManager {
    constructor(name, location) {
        this.name = name;
        this.location = location;
        this.events = [];
    }
    
    addEvent(event) {
        this.events.push(event);
        console.log(`✅ Added event: ${event}`);
    }
    
    getEventCount() {
        return this.events.length;
    }
}

// Constructor usage demo
const manager = new EventManager('EventHub', 'New York');
manager.addEvent('Tech Summit');
manager.addEvent('Workshop Day');
console.log('📊 Event manager has', manager.getEventCount(), 'events');

// Initialize application when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

// Export for module usage (if needed)
// export { fetchEvents, filterEvents, displayEvents };