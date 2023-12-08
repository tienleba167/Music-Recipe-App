// Home.js
import React, { useState } from 'react';

const Home = () => {
  const clientId = "3ddc42f99d414392bb5fa571f15e6234";
  const redirectUri = "http://localhost:3000/callback";
  const authEndpoint = "https://accounts.spotify.com/authorize";

  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  const handleLogin = () => {
    const responseType = 'token';
    const scope = [
        "streaming",
        "user-read-email",
        "user-read-private",
      ];

    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
  };

  return (
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
      <div className="login-container">
          <button className="login-button" onClick={handleLogin}>
            Login with Spotify
          </button>
      </div>
    </div>
  );
};

export default Home;

