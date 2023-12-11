import React, { useState, useEffect } from 'react';
import PlaylistTracks from './PlaylistTracks';
import '../style/PlaylistStyles.css';
import handleSavePlaylist from './handleSavePlaylist';

function RecipeList({ recipes }) {
  const [loadedRecipes, setLoadedRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [playlistData, setPlaylistData] = useState(null); // State to store playlist data
  const [selectedPlaylist, setSelectedPlaylist] = useState(null);

  const handleSelectRecipe = async (recipe) => {
    console.log('Selected Recipe:', recipe);
    if (selectedRecipe === recipe) {
      setSelectedRecipe(null);
      setPlaylistData(null); // Clear playlist data when deselecting a recipe
    } else {
      setSelectedRecipe(recipe);
      await fetchPlaylistsForRecipe(recipe); // Fetch playlists for the selected recipe
    }
  };

  const handlePlaylistClick = (playlistId) => {
    // Toggle the selected playlist
    if (selectedPlaylist === playlistId) {
      setSelectedPlaylist(null);
    } else {
      setSelectedPlaylist(playlistId);
    }
  };

  const fetchPlaylistsForRecipe = async (recipe) => {
    const accessToken = localStorage.getItem('spotify_access_token');
    const recipeName = recipe.recipe.label;

    if (!accessToken) {
        return;
    }
    console.log('Fetching playlists for selected recipe');

    try {
        const playlistResponse = await fetch(`http://localhost:4000/api/spotify/getPlaylistByRecipe/${recipeName}?recipeName=${encodeURIComponent(recipeName)}&access_token=${accessToken}`);
      
        if (!playlistResponse.ok) {
            throw new Error(`Error fetching user playlists: ${playlistResponse.statusText}`);
        }

        const playlistData = await playlistResponse.json();
        setPlaylistData(playlistData); // Update state with the fetched playlist data
        console.log('Playlists for Selected Recipe:', playlistData);

    } catch (error) {
        console.error('Error during data fetching:', error);
    }
  };

useEffect(() => {
    const interval = setInterval(() => {
      if (recipes && Array.isArray(recipes)) {
        setLoadedRecipes(recipes);
        clearInterval(interval);
      }
    }, 1000); // Check every 1000 milliseconds (1 second)

    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [recipes]);

  // Check if loadedRecipes is available and is an array
  if (!loadedRecipes.length) {
    // Display a loading message or placeholder content
    return <div>Loading recipes...</div>;
  }

  const savePlaylist = async (playlistId, playlistName) => {
    try {
        const userId = localStorage.getItem('spotify_user_id');
        const message = await handleSavePlaylist(playlistId, userId, playlistName);
        alert(message);
    } catch (error) {
        alert('Failed to save playlist');
    }
};


  // Rendering playlists
  const renderPlaylists = () => {
    return (
      <div>
      <div className="playlist-container">
        {playlistData && playlistData.playlists && playlistData.playlists.items.map((playlist, index) => (
          <div key={index} className="playlist-item">
            <img 
              src={playlist.images[0].url} 
              alt={playlist.name} 
              className="playlist-image" 
              onClick={() => handlePlaylistClick(playlist.id)}
            />
            <div className="playlist-name" onClick={() => handlePlaylistClick(playlist.id)}> {playlist.name}
            </div>{selectedPlaylist === playlist.id && <PlaylistTracks playlistId={playlist.id} />}
            <button onClick={() => savePlaylist(playlist.id, playlist.name)} className="save-playlist-button">Save Playlist</button>
          </div>
        ))}
      </div>
      </div>
    );
  };

  // ... Rest of the component rendering logic ...

  return (
    <div>
      {loadedRecipes.map((recipeItem, index) => (
        <div key={index} style={selectedRecipe === recipeItem ? {} : null}>
          <h2>{recipeItem.recipe.label}</h2>
          <img src={recipeItem.recipe.image} alt={recipeItem.recipe.label} />
          <ul>
            {recipeItem.recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient.text}</li>
            ))}
          </ul>
          <button onClick={() => handleSelectRecipe(recipeItem)}>
            {selectedRecipe === recipeItem ? 'Deselect Recipe' : 'Select Recipe'}
          </button>
        </div>
      ))}
	{renderPlaylists()}
    </div>
  );
}

export default RecipeList;
