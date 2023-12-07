// Home.js
import React from 'react';

const Home = () => {
  const clientId = "3ddc42f99d414392bb5fa571f15e6234";
  const redirectUri = "http://localhost:3000/callback";
  const authEndpoint = "https://accounts.spotify.com/authorize";

  const handleLogin = () => {
    const responseType = 'token';
    const scope = 'playlist-read-private';

    const url = `${authEndpoint}?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=${responseType}&scope=${encodeURIComponent(scope)}`;

    window.location.href = url;
  };

  return (
    
    <div>
      <h1>Welcome to the Home Page</h1>
      <p>This is the main page of your application.</p>
      <div className="login-container">
      <h1>Spotify Playlist for Your Recipe</h1>
      <button className="login-button" onClick={handleLogin}>
        Login with Spotify
      </button>
    </div>
    </div>
  );
};

export default Home;
