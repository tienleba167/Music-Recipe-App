// PlaylistTracks.js
import React, { useState, useEffect } from 'react';
import '../style/PlaylistStyles.css';

function PlaylistTracks({ playlistId }) {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
    const accessToken = localStorage.getItem('spotify_access_token');

    if (!accessToken) {
        return;
    }
    console.log('Fetching tracks for selected playlist');

    const fetchTracks = async () => {
      const response = await fetch(`http://localhost:4000/api/spotify/getPlaylistTracks/${playlistId}?playlistId=${encodeURIComponent(playlistId)}&access_token=${accessToken}`);
      const data = await response.json();
      console.log('Tracks for Selected Playlist:', data);
      setTracks(data.items);
    };

    if (playlistId) {
      fetchTracks();
    }
  }, [playlistId]);

    const formatDuration = (duration_ms) => {
        return `${Math.floor(duration_ms / 60000)}:${Math.floor((duration_ms % 60000) / 1000).toFixed(0).padStart(2, '0')}`;
    };

  return (
    <div>
      {tracks.map((item, index) => (
        <div key={index}>
          {item.track.album.images.length > 0 && (
            <img src={item.track.album.images[0].url} alt={item.track.name} style={{ width: '50px', height: '50px' }} />
          )}
          <p>{item.track.name}</p>
          <p>Duration: {formatDuration(item.track.duration_ms)}</p>
        </div>
      ))}
    </div>
  );
}

export default PlaylistTracks;
