let auth0Client = null;

const fetchAuthConfig = () => fetch("/auth_config.json");

const configureClient = async () => {
  const response = await fetchAuthConfig();
  const config = await response.json();

  auth0Client = await auth0.createAuth0Client({
    domain: config.domain,
    clientId: config.clientId,
    authorizationParams: {
      audience: config.audience // Added audience
    }
  });
};

window.onload = async () => {
  await configureClient();

  updateUI();

  // Event listener for My Account link
  const myAccountLink = document.getElementById('myAccountLink');
  if (myAccountLink) {
    myAccountLink.addEventListener('click', async (e) => {
      e.preventDefault(); // Prevent default link navigation
      const isAuthenticated = await auth0Client.isAuthenticated();
      if (!isAuthenticated) {
        // If not authenticated, it's "My Account", so trigger login
        login();
      } else {
        // If authenticated, it's "Billing", so navigate to its href (Stripe)
        window.location.href = myAccountLink.href;
      }
    });
  } else {
    console.error('#myAccountLink not found. Cannot attach click listener.');
  }

  // Event listener for Logout button
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', (e) => {
      e.preventDefault();
      logout();
    });
  } else {
    console.error('#logoutButton not found. Cannot attach click listener.');
  }

  const isAuthenticated = await auth0Client.isAuthenticated();

  if (isAuthenticated) {
    // show the gated content
    return;
  }

  const query = window.location.search;
  if (query.includes("code=") && query.includes("state=")) {
    await auth0Client.handleRedirectCallback();
    updateUI();
    window.history.replaceState({}, document.title, "/");
  }
};

const updateUI = async () => {
  const isAuthenticated = await auth0Client.isAuthenticated();
  const myAccountLink = document.getElementById('myAccountLink');
  const logoutButton = document.getElementById('logoutButton');
  const stripeBillingUrl = 'https://billing.stripe.com/p/login/eVadRu2Qe0qCeycfYY'; // Store the URL

  if (!myAccountLink || !logoutButton) {
    console.error('UI elements (myAccountLink or logoutButton) not found. Cannot update UI.');
    return;
  }

  if (isAuthenticated) {
    // User is logged in
    myAccountLink.textContent = 'Billing';
    myAccountLink.href = stripeBillingUrl;
    logoutButton.style.display = 'inline-block'; // Or 'block', depending on desired layout
  } else {
    // User is logged out
    myAccountLink.textContent = 'My Account';
    myAccountLink.href = '#'; // Should trigger login via event listener
    logoutButton.style.display = 'none';
  }
};

const login = async () => {
  await auth0Client.loginWithRedirect({
    authorizationParams: {
      redirect_uri: window.location.origin
    }
  });
};

const logout = () => {
  auth0Client.logout({
    logoutParams: {
      returnTo: window.location.origin
    }
  });
};
