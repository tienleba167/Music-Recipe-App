import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [playlists, setPlaylists] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
  
    useEffect(() => {
      const accessToken = localStorage.getItem('spotify_access_token');
      if (!accessToken) {
        return;
      }

      console.log('Fetching user playlists');

      const fetchData = async () => {
    
        try {
          const playlistResponse = await fetch(`http://localhost:4000/api/spotify/getUserPlaylists?access_token=${accessToken}`);
          if (!playlistResponse.ok) {
            throw new Error(`Error fetching user playlists: ${playlistResponse.statusText}`);
          }
          const playlistData = await playlistResponse.json();
          console.log('All Playlists:', playlistData.items);
      
          for (const playlist of playlistData.items) {
            // Fetch the playlist tracks
            const trackResponse = await fetch(`http://localhost:4000/api/spotify/getPlaylistTracks/${encodeURIComponent(playlist.tracks.href)}?access_token=${accessToken}`);
            if (!trackResponse.ok) {
              throw new Error(`Error fetching playlist tracks: ${trackResponse.statusText}`);
            }
          }
          setPlaylists([...playlistData.items]);
      
          const userProfileResponse = await fetch(`http://localhost:4000/api/spotify/getUserProfile?access_token=${accessToken}`);
          if (!userProfileResponse.ok) {
            throw new Error(`Error fetching user profile: ${userProfileResponse.statusText}`);
          }
          const userProfileData = await userProfileResponse.json();
          console.log('User Profile Data:', userProfileData);
          setDisplayName(userProfileData.display_name);
        } catch (error) {
          console.error('Error during data fetching:', error);
          setError(error.message);
        }
        setIsLoading(false);
      };  
      fetchData();
    }, []);
  
    
  
    return (
      <>
          <>
          <div className="dashboard-container">
            <div className="dashboard-header">
              <h1>{displayName}'s Playlists</h1>
            </div>
          </div>
          </>
      </>
    );
};

export default Profile;