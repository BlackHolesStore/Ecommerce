window.addEventListener('load', () => {
  const audio = document.getElementById('bg-audio');
  audio.play().catch(error => {
    console.log('Autoplay failed:', error);
    document.addEventListener('click', () => audio.play(), { once: true });
  });
});

// Disable right-click
document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  alert('FREE SHIPPING,use promo code : "SpaceSHip" ');
});

// Disable text selection
document.addEventListener('selectstart', (e) => {
  e.preventDefault();
});

// Disable copy and cut
document.addEventListener('copy', (e) => {
  e.preventDefault();
});
document.addEventListener('cut', (e) => {
  e.preventDefault();
});

// Disable specific keyboard shortcuts
document.addEventListener('keydown', (e) => {
  if (
    (e.ctrlKey && e.key === 'u') || // Ctrl+U (view source)
    (e.ctrlKey && e.shiftKey && e.key === 'I') || // Ctrl+Shift+I (dev tools)
    (e.ctrlKey && e.shiftKey && e.key === 'J') || // Ctrl+Shift+J (dev tools)
    (e.ctrlKey && e.key === 's') // Ctrl+S (save)
  ) {
    e.preventDefault();
  }
});

// Detect developer tools (not foolproof)
(function checkDevTools() {
  const threshold = 160;
  const widthThreshold = window.outerWidth - window.innerWidth > threshold;
  const heightThreshold = window.outerHeight - window.innerHeight > threshold;
  if (widthThreshold || heightThreshold) {
    alert('Developer tools are disabled on this site.');
    // Optionally redirect: window.location.href = 'about:blank';
  }
  setTimeout(checkDevTools, 1000);
})();

// Block view-source (less reliable)
if (window.location.protocol === 'view-source:') {
  window.location.href = 'about:blank';
}

function showZoom() {
  document.getElementById('zoomModal').style.display = 'flex';
}
function hideZoom() {
  document.getElementById('zoomModal').style.display = 'none';
}
function showInfo() {
  document.getElementById('infoModal').style.display = 'flex';
}
function hideInfo(event) {
  if (event.target.classList.contains('info-modal') || event.target.classList.contains('close-button')) {
    document.getElementById('infoModal').style.display = 'none';
  }
}
function showPrivacy() {
  document.getElementById('privacyModal').style.display = 'flex';
}
function hidePrivacy(event) {
  if (event.target.classList.contains('privacy-modal') || event.target.classList.contains('close-button')) {
    document.getElementById('privacyModal').style.display = 'none';
  }
}
function showShipping() {
  document.getElementById('shippingModal').style.display = 'flex';
}
function hideShipping(event) {
  if (event.target.classList.contains('shipping-modal') || event.target.classList.contains('close-button')) {
    document.getElementById('shippingModal').style.display = 'none';
  }
}
function showTerms() {
  document.getElementById('termsModal').style.display = 'flex';
}
function hideTerms(event) {
  if (event.target.classList.contains('terms-modal') || event.target.classList.contains('close-button')) {
    document.getElementById('termsModal').style.display = 'none';
  }
}
function showContact() {
  document.getElementById('contactModal').style.display = 'flex';
}
function hideContact(event) {
  if (event.target.classList.contains('contact-modal') || event.target.classList.contains('close-button')) {
    document.getElementById('contactModal').style.display = 'none';
  }
}
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});
