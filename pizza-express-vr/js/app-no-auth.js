// Pizza Express VR Game - No Authentication Required
// This script loads the game immediately without any Auth0 authentication

console.log("🎮 Initializing Pizza Express VR Game (No Auth0)...");

// Optional: Add a simple status indicator with PLAY button
document.addEventListener('DOMContentLoaded', () => {
  const gameContainer = document.getElementById('game-container');
  if (gameContainer) {
    gameContainer.innerHTML = `
      <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 70vh;
        text-align: center;
        gap: 30px;
      ">
        <div>
          <p style="font-size: 48px; margin: 0;">✅</p>
          <p style="font-size: 28px; font-weight: bold; margin: 10px 0;">Game Ready!</p>
          <p style="font-size: 16px; color: #555; margin: 10px 0;">No authentication required</p>
        </div>
        
        <button 
          id="play-btn"
          style="
            padding: 20px 60px;
            font-size: 28px;
            font-weight: bold;
            background: linear-gradient(135deg, #ff6600 0%, #ff8800 100%);
            color: white;
            border: none;
            border-radius: 50px;
            cursor: pointer;
            box-shadow: 0 8px 15px rgba(255, 102, 0, 0.3);
            transition: all 0.3s ease;
            text-transform: uppercase;
            letter-spacing: 2px;
          "
          onmouseover="this.style.transform='scale(1.05)'; this.style.boxShadow='0 12px 20px rgba(255, 102, 0, 0.5)';"
          onmouseout="this.style.transform='scale(1)'; this.style.boxShadow='0 8px 15px rgba(255, 102, 0, 0.3)';"
        >
          🍕 PLAY NOW
        </button>
        
        <p style="font-size: 12px; color: #999;">Enjoy the Pizza Express VR Experience!</p>
      </div>
    `;

    // Add click handler to play button
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
      playBtn.addEventListener('click', () => {
        console.log("🎮 Starting game...");

        // Show install PWA prompt first
        const installChoice = confirm(
          '🍕 Want to install Pizza Express VR as an app?\n\n' +
          'Install it for better performance and offline play!\n\n' +
          'Click OK to install, or Cancel to play in browser.'
        );

        // Game URL - redirect to game.html
        const gameUrl = '/pizza-express-vr/game.html';

        if (installChoice) {
          console.log("✅ User wants to install PWA");
          // Trigger PWA install prompt if available
          if (window.deferredPrompt) {
            window.deferredPrompt.prompt();
            window.deferredPrompt.userChoice.then((choiceResult) => {
              if (choiceResult.outcome === 'accepted') {
                console.log('✅ PWA installed!');
              }
              // After install prompt, go to game
              window.location.href = gameUrl;
            });
          } else {
            // No install prompt available, just go to game
            console.log("⚠️ PWA install not available on this browser/device");
            window.location.href = gameUrl;
          }
        } else {
          console.log("📱 User chose to play in browser");
          // Go directly to the game
          window.location.href = gameUrl;
        }
      });
    }
  }
});

// Set up game to load without authentication
window.addEventListener('load', () => {
  console.log("✅ Page loaded - Game ready to play!");
  console.log("🍕 No login required - Enjoy the game!");
});
