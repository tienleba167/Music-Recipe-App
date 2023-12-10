import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeList from './recipelist';

const Profile = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [displayName, setDisplayName] = useState('');
    const [query, setQuery] = useState("chicken");
    const [recipes, setRecipes] = useState([]);
    const [search, setSearch] = useState("");
    // const [playlists, setPlaylists] = useState([]);
    // const [error, setError] = useState(null);
    // const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('spotify_access_token');
        
        if (!accessToken) {
          return;
        }
  
        console.log('Fetching user information');
  
        const fetchData = async () => {
      
          try {
              const playlistResponse = await fetch(`http://localhost:4000/api/spotify/getUserPlaylists?access_token=${accessToken}`);
            
              if (!playlistResponse.ok) {
                  throw new Error(`Error fetching user playlists: ${playlistResponse.statusText}`);
              }
  
              const playlistData = await playlistResponse.json();
              console.log('All Playlists:', playlistData.items);
        
              for (const playlist of playlistData.items) {
                  const trackResponse = await fetch(`http://localhost:4000/api/spotify/getPlaylistTracks/${encodeURIComponent(playlist.tracks.href)}?access_token=${accessToken}`);
                  if (!trackResponse.ok) {
                      throw new Error(`Error fetching playlist tracks: ${trackResponse.statusText}`);
                  }
              }
        
              const userProfileResponse = await fetch(`http://localhost:4000/api/spotify/getUserProfile?access_token=${accessToken}`);
              if (!userProfileResponse.ok) {
                  throw new Error(`Error fetching user profile: ${userProfileResponse.statusText}`);
              }
              const userProfileData = await userProfileResponse.json();
              console.log('User Profile Data:', userProfileData);
              setDisplayName(userProfileData.display_name);

          } catch (error) {
              console.error('Error during data fetching:', error);
          }
          setIsLoading(false);
  
        };  
  
        fetchData();
  
      }, []);

    const getRecipes = async () => {
        try{
            const response = await fetch(`http://localhost:4000/recipes/${query}`);
            if (!response.ok) {
                throw new Error(`Error fetching recipes: ${response.statusText}`);
            }
            const responseData = await response.json();
            console.log('API Response:', responseData); // Log the response to inspect its structure
            setRecipes(responseData); // Assuming 'hits' contains the array of recipes
            console.log('Recipes:', recipes);
        }
        catch(error){
            console.error('Error fetching recipes:', error);
        }
    }

    useEffect(() => {
        getRecipes();
    },[query]);

    const getSearch = ((e) => {
        e.preventDefault();
        setQuery(search);
        setSearch('');
    })


    return (
        <div>
            {isLoading ? (
                <div className="loader-wrapper">Loading...</div>
            ) : (
                <>
                    <div className="dashboard-container">
                        <div className="dashboard-header">
                            <h1>{displayName}'s Playlists</h1>
                        </div>
                        <form onSubmit={getSearch} className='search-form'>
                            <input className='search-bar' type='text' value={search} onChange={e => setSearch(e.target.value)} />
                            <button className='search-button' type='submit'>Search</button>
                        </form>
                        <div className='recipes-list'>
                            {Array.isArray(recipes) && recipes.length > 0 ? (
                                <RecipeList recipes={recipes} />
                            ) : (
                                <p>No recipes found.</p>
                            )}
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Profile;