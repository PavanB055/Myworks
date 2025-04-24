// Optimized JavaScript with performance improvements
let currentScreen = 1;
let karmaPoints = 0;
const userChoices = new Map();

// Performance optimization: Use requestAnimationFrame for animations
let animationFrame;
const animate = (timestamp) => {
    // Animation logic here
    animationFrame = requestAnimationFrame(animate);
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Hide loading screen after content loads with slight delay for better UX
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = 0;
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
            }, 500);
        }, 2000);
    });

    initializeKarmaSystem();
    setupEventListeners();
    startAnimations();
    initializeDestinyPaths();
});

// Screen Navigation
function nextScreen() {
    const currentElement = document.querySelector('.screen.active');
    const nextElement = document.getElementById(`screen${currentScreen + 1}`);
    
    if (nextElement) {
        currentElement.classList.remove('active');
        nextElement.classList.add('active');
        currentScreen++;
        
        // Optimize GSAP animations
        gsap.from(nextElement, {
            opacity: 0,
            y: 20,
            duration: 0.5,
            clearProps: 'all'
        });

        // Handle special screen transitions
        handleScreenTransition(currentScreen);
    }
}

// Handle specific actions for different screens
function handleScreenTransition(screenNumber) {
    switch(screenNumber) {
        case 5:
            // For karma chart screen
            setTimeout(updateKarmaChart, 500);
            updateDestinyResult();
            break;
        case 6:
            // For final decree screen
            displayFinalDecree();
            break;
        case 8:
            // For error screen - add glitch intensity
            const errorContainer = document.querySelector('.error-container');
            errorContainer.style.animation = 'error-pulse 1s infinite';
            break;
    }
}

// Karma System
function initializeKarmaSystem() {
    const karmaChecks = document.getElementById('karma-checks');
    const actions = [
        { id: 'lies', label: 'Lies', value: -2 },
        { id: 'kindness', label: 'Kindness', value: 2 },
        { id: 'harm', label: 'Harm', value: -3 },
        { id: 'help', label: 'Helping Others', value: 3 },
        { id: 'selfish', label: 'Selfishness', value: -2 },
        { id: 'charity', label: 'Charity', value: 2 }
    ];

    actions.forEach(action => {
        const checkbox = document.createElement('div');
        checkbox.innerHTML = `
            <label>
                <input type="checkbox" id="${action.id}" value="${action.value}">
                ${action.label}
            </label>
        `;
        karmaChecks.appendChild(checkbox);
    });
}

// Process Karma
function processKarma() {
    const checkboxes = document.querySelectorAll('#karma-checks input:checked');
    const confession = document.getElementById('confession').value;
    
    karmaPoints = Array.from(checkboxes)
        .reduce((sum, checkbox) => sum + parseInt(checkbox.value), 0);
    
    // Add karma points based on confession length and content
    if (confession.length > 0) {
        // More points for longer confessions (showing honesty)
        karmaPoints += confession.length > 100 ? 2 : 1;
        
        // Detect regret or remorse in confession (simple check)
        if (confession.toLowerCase().includes('sorry') || 
            confession.toLowerCase().includes('regret') ||
            confession.toLowerCase().includes('apologize')) {
            karmaPoints += 2;
        }
    }
    
    userChoices.set('karma', karmaPoints);
    nextScreen();
}

// Add missing choosePath function
function choosePath(path) {
    userChoices.set('personality', path);
    
    // Add atma ID generation based on OTP or a random one if not provided
    const atmaOTP = document.getElementById('atmaOTP').value;
    const atmaID = atmaOTP ? generateAtmaID(atmaOTP) : generateRandomAtmaID();
    userChoices.set('atmaID', atmaID);
    
    // Update UI based on personality choice
    document.getElementById('atma-details').innerHTML = `
        <p>Soul Type: ${path.toUpperCase()}</p>
        <p>Personality Matrix: ${getPersonalityMatrix(path)}</p>
        <p>Atma ID: ${atmaID}</p>
        <p>Cosmic Origin: ${getCosmicOrigin(path)}</p>
    `;
    
    nextScreen();
}

// Helper functions for personality path
function getPersonalityMatrix(path) {
    const matrices = {
        'regret': 'R-7.3 Introspective',
        'proud': 'P-4.2 Confident',
        'forgetful': 'F-9.8 Adaptive'
    };
    return matrices[path] || 'Standard';
}

function getCosmicOrigin(path) {
    const origins = {
        'regret': 'Nebula of Reflection',
        'proud': 'Solar Apex Prime',
        'forgetful': 'Void of Forgotten Memories'
    };
    return origins[path] || 'Unknown Origin';
}

function generateAtmaID(seed) {
    // Generate a consistent ID based on the seed
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = ((hash << 5) - hash) + seed.charCodeAt(i);
        hash |= 0; // Convert to 32bit integer
    }
    return `ATM-${Math.abs(hash).toString(16).toUpperCase().padStart(8, '0')}`;
}

function generateRandomAtmaID() {
    return `ATM-${Math.floor(Math.random() * 16777215).toString(16).toUpperCase().padStart(6, '0')}`;
}

// Initialize destiny paths
function initializeDestinyPaths() {
    window.destinyPaths = {
        'high': {
            title: 'ASCENSION PATH',
            description: 'Your soul has been deemed worthy of ascension.'
        },
        'medium': {
            title: 'REINCARNATION PATH',
            description: 'Your soul will be recycled for another chance.'
        },
        'low': {
            title: 'PURGATORY PATH',
            description: 'Your soul requires purification before proceeding.'
        },
        'veryLow': {
            title: 'VOID PATH',
            description: 'Your soul has been sentenced to the void.'
        }
    };
}

// Update Karma Chart
function updateKarmaChart() {
    const ctx = document.getElementById('karma-chart').getContext('2d');
    
    // Clean up any existing chart
    if (window.karmaChartInstance) {
        window.karmaChartInstance.destroy();
    }
    
    // Create positive and negative values for the chart
    const positiveKarma = Math.max(0, karmaPoints);
    const negativeKarma = Math.max(0, -karmaPoints);
    
    window.karmaChartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Good Karma', 'Bad Karma'],
            datasets: [{
                data: [positiveKarma || 1, negativeKarma || 1], // Ensure at least 1 to show in chart
                backgroundColor: ['#4CAF50', '#f44336'],
                borderColor: ['#0ff', '#f0f'],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    labels: {
                        color: '#fff',
                        font: {
                            family: "'Share Tech Mono', monospace",
                            size: 14
                        }
                    }
                }
            },
            animation: {
                duration: 2000,
                easing: 'easeOutQuart'
            }
        }
    });
    
    // ADD GIF: Show karma visualization effect based on karma score
    // e.g. document.getElementById('karma-visualization').src = getKarmaGif(karmaPoints);
}

// Update destiny result based on karma
function updateDestinyResult() {
    const destinyResult = document.getElementById('destiny-result');
    let destinyPath;
    
    if (karmaPoints >= 5) {
        destinyPath = window.destinyPaths.high;
    } else if (karmaPoints >= 0) {
        destinyPath = window.destinyPaths.medium;
    } else if (karmaPoints >= -5) {
        destinyPath = window.destinyPaths.low;
    } else {
        destinyPath = window.destinyPaths.veryLow;
    }
    
    destinyResult.innerHTML = `
        <h3>${destinyPath.title}</h3>
        <p>${destinyPath.description}</p>
    `;
    
    userChoices.set('destiny', destinyPath.title);
    
    // ADD GIF: Add destiny path visualization
    // e.g. document.getElementById('destiny-gif').src = getDestinyGif(destinyPath.title);
}

// Display final decree and species assignment
function displayFinalDecree() {
    const personality = userChoices.get('personality') || 'standard';
    const destiny = userChoices.get('destiny') || 'REINCARNATION PATH';
    const finalDecree = document.getElementById('final-decree');
    const speciesAssignment = document.getElementById('species-assignment');
    
    finalDecree.textContent = `FINAL DECREE: ${destiny}`;
    
    // Determine next life based on karma and personality
    let nextLife;
    const karmaLevel = karmaPoints;

    if (karmaLevel >= 8) {
        // Highest karma - Noble beings
        nextLife = {
            type: personality === 'proud' ? 'Spiritual Leader' : 'Holy Saint',
            description: 'A life dedicated to guiding others towards enlightenment.'
        };
    } else if (karmaLevel >= 5) {
        // High karma - Good humans
        nextLife = {
            type: personality === 'regret' ? 'Compassionate Doctor' : 'Wise Teacher',
            description: 'A life of service and wisdom to help humanity.'
        };
    } else if (karmaLevel >= 2) {
        // Moderate karma - Pleasant animals
        nextLife = {
            type: personality === 'proud' ? 'Majestic Eagle' : 'Loyal Dog',
            description: 'A life of freedom and loyalty in nature.'
        };
    } else if (karmaLevel >= -2) {
        // Low karma - Simple beings
        nextLife = {
            type: personality === 'forgetful' ? 'Garden Bird' : 'House Cat',
            description: 'A simple life to learn humility and patience.'
        };
    } else if (karmaLevel >= -5) {
        // Very low karma - Challenging lives
        nextLife = {
            type: personality === 'proud' ? 'Street Beggar' : 'Hard Laborer',
            description: 'A life of struggle to understand compassion and humility.'
        };
    } else {
        // Lowest karma - Difficult existence
        nextLife = {
            type: 'Lowly Insect',
            description: 'A life of hardship to repay karmic debt.'
        };
    }
    
    speciesAssignment.innerHTML = `
        <h3>NEXT LIFE DESIGNATION</h3>
        <p class="next-life-type">${nextLife.type}</p>
        <p class="next-life-description">${nextLife.description}</p>
        <p class="karma-score">Karma Score: ${karmaLevel}</p>
    `;
    
    // You might want to add specific imagery for each next life type
    // e.g., document.getElementById('next-life-image').src = getNextLifeImage(nextLife.type);
}
function submitRating() {
    const rating = document.getElementById('rating').value;
    const finalRating = parseInt(rating);
    
    // Based on rating, show error or continue
    if (finalRating < 5) {
        // Show error screen for low ratings (they must be lying!)
        document.querySelector('.screen.active').classList.remove('active');
        document.getElementById('screen8').classList.add('active');
        currentScreen = 8;
    } else {
        alert(`Thank you for rating: ${rating}/10`);
        // In a real app, you might send this data to a server
        nextScreen();
    }
}

// Event Listeners
function setupEventListeners() {
    const rating = document.getElementById('rating');
    if (rating) {
        rating.addEventListener('input', (e) => {
            document.getElementById('rating-value').textContent = e.target.value;
        });
    }
    
    // Add listeners for keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            // Enter or Space to proceed (for accessibility)
            const activeScreen = document.querySelector('.screen.active');
            if (activeScreen.id !== 'screen4' && activeScreen.id !== 'screen7') {
                // Don't auto-proceed on screens requiring input
                nextScreen();
            }
        }
    });
}

// Start Animations
function startAnimations() {
    gsap.registerPlugin(ScrollTrigger);
    
    // Optimize scroll animations
    ScrollTrigger.batch('.screen', {
        onEnter: batch => gsap.to(batch, {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            overwrite: true
        }),
        once: true
    });
    
    // Start the animation loop
    animationFrame = requestAnimationFrame(animate);
}

// Restart Cycle
function restartCycle() {
    cancelAnimationFrame(animationFrame);
    karmaPoints = 0;
    currentScreen = 1;
    userChoices.clear();
    
    // Reset UI elements
    document.getElementById('atmaOTP').value = '';
    document.getElementById('exCode').value = '';
    document.getElementById('confession').value = '';
    document.querySelectorAll('#karma-checks input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Reset screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });
    document.getElementById('screen1').classList.add('active');
    
    // Restart animation
    animationFrame = requestAnimationFrame(animate);
}

// Clean up on page unload
window.addEventListener('unload', () => {
    cancelAnimationFrame(animationFrame);
});

// Helper function to get random string for IDs
function getRandomString(length) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < length; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
}