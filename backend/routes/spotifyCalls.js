const express = require('express');
const axios = require('axios');

//create a router in express
const router = express.Router();

const getUserPlaylists = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    let playlists = [];
    let url = 'https://api.spotify.com/v1/me/playlists';

    while (url) {
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      playlists = [...playlists, ...response.data.items];
      url = response.data.next;
    }

    res.json({ items: playlists });
  } catch (error) {
    console.error('Error getting user playlists:', error);
    res.status(500).send('Error getting user playlists');
  }
};

const getUserProfile = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting user profile:', error);
    res.status(500).send('Error getting user profile');
  }
};

const getPlaylistById = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const playlistId = req.params.playlistId;
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting playlist by ID:', error);
    res.status(500).send('Error getting playlist by ID');
  }
};

const getPlaylistByRecipe = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const recipeName = req.query.recipeName;
    const response = await axios.get(`https://api.spotify.com/v1/search?q=${encodeURIComponent(recipeName)}&type=playlist&limit=5`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting playlist:', error);
    res.status(500).send('Error getting playlist by ID');
  }
};

const getPlaylistTracks = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const playlistId = req.query.playlistId;
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks?limit=10`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting playlist tracks:', error);
    res.status(500).send('Error getting playlist tracks');
  }
};

router.get('/getUserPlaylists', getUserPlaylists);
router.get('/getPlaylistTracks/:playlistId', getPlaylistTracks);
router.get('/getUserProfile', getUserProfile);
router.get('/getPlaylistById/:playlistId', getPlaylistById);
router.get('/getPlaylistByRecipe/:recipeName', getPlaylistByRecipe);

// Export the helper functions
module.exports = router;