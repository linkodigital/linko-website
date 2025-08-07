// Windows 98 Desktop JavaScript

// Update time in taskbar
function updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    });
    document.getElementById('time').textContent = timeString;
}

// Update time every second
setInterval(updateTime, 1000);
updateTime(); // Initial call

// Window management
function openFolder(folderName) {
    const windowId = `${folderName}-window`;
    const window = document.getElementById(windowId);
    
    if (window) {
        // Close any other open windows first
        closeAllWindows();
        
        // Show the selected window
        window.style.display = 'block';
        
        // Reset position to center
        window.style.left = '50%';
        window.style.top = '50%';
        window.style.transform = 'translate(-50%, -50%)';
        
        // Reset dimensions to auto
        window.style.width = 'auto';
        window.style.height = 'auto';
        
        // Bring to front
        window.style.zIndex = '100';
        
        // Create start bar window
        createStartBarWindow(folderName);
        
        // Add click sound effect (optional)
        playClickSound();
    }
}

function closeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'none';
        
        // Reset dimensions and position
        window.style.width = 'auto';
        window.style.height = 'auto';
        window.style.left = '50%';
        window.style.top = '50%';
        window.style.transform = 'translate(-50%, -50%)';
        
        // Remove start bar window
        const folderName = windowId.replace('-window', '');
        removeStartBarWindow(folderName);
        
        playClickSound();
    }
}

function minimizeWindow(windowId) {
    const window = document.getElementById(windowId);
    if (window) {
        window.style.display = 'none';
        playClickSound();
    }
}

function closeAllWindows() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.style.display = 'none';
    });
    
    // Remove all start bar windows
    removeAllStartBarWindows();
}

// Start bar window management
function createStartBarWindow(folderName) {
    // Remove existing start bar window for this folder if it exists
    removeStartBarWindow(folderName);
    
    const startBar = document.querySelector('.start-bar');
    const startBarWindow = document.createElement('div');
    startBarWindow.className = 'start-bar-window';
    startBarWindow.id = `${folderName}-start-bar-window`;
    
    // Get the display name for the folder
    const displayName = folderName === 'michele' ? 'Michele Paludetti' : 'Giovanni Zorzato';
    startBarWindow.textContent = displayName;
    
    // Insert into the start-bar-left container, after the start button wrapper
    const startBarLeft = document.querySelector('.start-bar-left');
    const startButtonWrapper = document.querySelector('.start-button-wrapper');
    startBarLeft.insertBefore(startBarWindow, startButtonWrapper.nextSibling);
}

function removeStartBarWindow(folderName) {
    const startBarWindow = document.getElementById(`${folderName}-start-bar-window`);
    if (startBarWindow) {
        startBarWindow.remove();
    }
}

function removeAllStartBarWindows() {
    const startBarWindows = document.querySelectorAll('.start-bar-window');
    startBarWindows.forEach(window => {
        window.remove();
    });
}

// Make windows draggable
function makeWindowDraggable(windowElement) {
    const header = windowElement.querySelector('.window-header');
    let isDragging = false;
    let startX, startY;
    let initialLeft, initialTop;

    header.addEventListener('mousedown', dragStart);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', dragEnd);

    function dragStart(e) {
        // Only start dragging if clicking on the header or its children
        if (e.target.closest('.window-header')) {
            isDragging = true;
            
            // Get current position and dimensions
            const rect = windowElement.getBoundingClientRect();
            initialLeft = rect.left;
            initialTop = rect.top;
            
            // Store current dimensions to prevent resizing
            windowElement.style.width = rect.width + 'px';
            windowElement.style.height = rect.height + 'px';
            
            // Get mouse position
            startX = e.clientX;
            startY = e.clientY;
            
            // Bring window to front
            bringToFront(windowElement);
            
            e.preventDefault();
        }
    }

    function drag(e) {
        if (isDragging) {
            e.preventDefault();
            
            // Calculate new position
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newLeft = initialLeft + deltaX;
            const newTop = initialTop + deltaY;
            
            // Apply new position
            windowElement.style.left = newLeft + 'px';
            windowElement.style.top = newTop + 'px';
            windowElement.style.transform = 'none'; // Remove any existing transform
        }
    }

    function dragEnd(e) {
        isDragging = false;
    }
}

// Initialize draggable windows
document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        makeWindowDraggable(window);
    });
});

// Click sound effect (optional)
function playClickSound() {
    // Create a simple click sound using Web Audio API
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
        
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
        
        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        // Fallback if Web Audio API is not supported
        console.log('Audio not supported');
    }
}

// Linko Team Facts Easter Egg
const linkoFacts = [
    "Michele once redesigned an entire app interface during a 3-hour train ride from Milan to Rome",
    "Giovanni can debug production code while simultaneously explaining the issue to stakeholders",
    "The team name 'Linko' was chosen because it sounds like 'link' but with a playful twist",
    "Michele's design philosophy: 'If it looks good, it probably works better too'",
    "Giovanni's secret weapon: He can write clean, documented code on the first try",
    "This website was built with 98% Windows 98 nostalgia and 2% modern web magic",
    "Michele has a collection of 47 different design system components that he's never used",
    "Giovanni once fixed a critical bug by dreaming about the solution overnight",
    "The team's unofficial motto: 'Design like it's 1998, code like it's 2024'",
    "Michele can spot a misaligned pixel from across the room",
    "Giovanni's database queries are so optimized, they run faster than you can blink",
    "This desktop background was inspired by actual Windows 98 screenshots from the archives",
    "Michele's favorite design tool: Figma (but he still has a soft spot for Photoshop 7.0)",
    "Giovanni believes every function should have a purpose, and every purpose should have a function",
    "The team once spent 2 hours debating whether to use 'px' or 'em' for a single element"
];

let factIndex = 0;

function showLinkoFact() {
    const fact = linkoFacts[factIndex];
    factIndex = (factIndex + 1) % linkoFacts.length;
    
    // Create a Windows 98-style message box
    const messageBox = document.createElement('div');
    messageBox.className = 'linko-fact-box';
    messageBox.innerHTML = `
        <div class="fact-header">
            <div style="display: flex; align-items: center; flex: 1;">
                <img src="images/linko logo.svg" alt="Linko" style="width: 16px; height: 16px; margin-right: 8px; filter: brightness(0) invert(1);">
                Linko Team Fact
            </div>
            <button onclick="this.parentElement.parentElement.remove()" style="background: #c0c0c0; border: 2px outset #c0c0c0; width: 20px; height: 20px; cursor: pointer; font-size: 14px; font-weight: bold; display: flex; align-items: center; justify-content: center; color: #000;">×</button>
        </div>
        <div class="fact-content">
            <div style="display: flex; align-items: flex-start; gap: 15px;">
                <img src="images/clippy+transparent+copy.gif" alt="Clippy" style="width: 80px; height: 80px; flex-shrink: 0;">
                <p>${fact}</p>
            </div>
        </div>
        <div class="fact-footer">
            <button onclick="this.parentElement.parentElement.remove()">OK</button>
        </div>
    `;
    
    document.body.appendChild(messageBox);
    
    // Auto-remove after 8 seconds
    setTimeout(() => {
        if (messageBox.parentElement) {
            messageBox.remove();
        }
    }, 8000);
}

// Start button functionality
document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.querySelector('.start-button');
    if (startButton) {
        startButton.addEventListener('click', function() {
            playClickSound();
            showLinkoFact();
        });
    }
});

// Close windows when clicking outside
document.addEventListener('click', function(e) {
    if (!e.target.closest('.window') && !e.target.closest('.desktop-icon')) {
        closeAllWindows();
    }
});

// Prevent context menu on desktop
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
});

// Favicon dark mode detection
function updateFavicon() {
    const favicon = document.getElementById('favicon');
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        favicon.href = 'images/favicon white.svg';
    } else {
        favicon.href = 'images/favicon black.svg';
    }
}

// Listen for dark mode changes
if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateFavicon);
}

// Add some Windows 98 nostalgia
document.addEventListener('DOMContentLoaded', function() {
    // Set initial favicon
    updateFavicon();
    
    // Add welcome message
    setTimeout(() => {
        console.log('Welcome to Windows 98!');
        console.log('Click on the folders to view team member profiles.');
    }, 1000);
});

// Handle window focus
function bringToFront(windowElement) {
    const windows = document.querySelectorAll('.window');
    let maxZ = 100;
    
    windows.forEach(window => {
        const zIndex = parseInt(window.style.zIndex) || 100;
        if (zIndex > maxZ) maxZ = zIndex;
    });
    
    windowElement.style.zIndex = maxZ + 1;
}

// Add click handlers to bring windows to front
document.addEventListener('DOMContentLoaded', function() {
    const windows = document.querySelectorAll('.window');
    windows.forEach(window => {
        window.addEventListener('click', function() {
            bringToFront(this);
        });
    });
}); 