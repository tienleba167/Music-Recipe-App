import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SavedPage = () => {
    const navigate = useNavigate();
    const [playlists, setPlaylists] = useState([]);

    const handleFetchUserPlaylists = async (userId) => {
        try {
            const response = await fetch(`http://localhost:4000/api/firebase/getUserPlaylists/${userId}`);
            
            if (!response.ok) {
                throw new Error('Error fetching user playlists');
            }
            const playlistIds = await response.json();
            return playlistIds;
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    const fetchPlaylists = async () => {
        const userId = localStorage.getItem('spotify_user_id');
        try {
            const playlistIds = await handleFetchUserPlaylists(userId);
            setPlaylists(playlistIds); // Update state with playlist IDs
            // Optionally, do something with the playlist IDs like navigating to a playlist page
        } catch (error) {
            console.error('Error fetching playlists:', error);
            // Handle error
        }
    };

    return (
        <div>
            <button onClick={() => navigate('/profile')}>Home Profile</button>
            <button onClick={() => navigate('/')}>Logout</button>
            <button onClick={fetchPlaylists}>Fetch Playlists</button>
            {playlists.length > 0 && (
                <ul>
                    {playlists.map((playlist, index) => (
                        <li key={index}>{playlist.playlistName} (ID: {playlist.playlistId})</li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SavedPage;
