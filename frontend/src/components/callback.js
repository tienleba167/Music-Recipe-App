// Callback.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {auth, signInWithCustomToken, app} from "../firebase";
import 'firebase/compat/auth';

const Callback = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");

    const authenticateWithFirebase = async (spotifyAccessToken) => {
        try {
          const response = await fetch('http://localhost:4000/api/authenticate', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ accessToken: spotifyAccessToken }),
          });
      
          const data = await response.json();
          const customToken = data.firebaseToken;

          // Store the Spotify user ID in local storage
          localStorage.setItem('spotify_user_id', data.spotifyUserId);

          await signInWithCustomToken(auth, customToken);
        } catch (error) {
          console.error('Error authenticating with Firebase:', error);
        }
    };

    useEffect(() => {
        const hash = window.location.hash
          .substring(1)
          .split('&')
          .reduce((initial, item) => {
            const parts = item.split('=');
            initial[parts[0]] = decodeURIComponent(parts[1]);
            return initial;
          }, {});
    
        if (hash.access_token) {
            setToken(hash.access_token);
            localStorage.setItem('spotify_access_token', hash.access_token);
            authenticateWithFirebase(hash.access_token);
            navigate('/profile');
        } else {
            // navigate('/');
        }
      }, [navigate]);
  
    return (
      <div className="App">
        <header className="App-header">
            <h1 className="App-title">Loading...</h1>
        </header>
      </div>
    );
};

export default Callback;
