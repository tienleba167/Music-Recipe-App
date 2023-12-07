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


const getPlaylistTracks = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const tracksHref = req.params.tracksHref;
    const response = await axios.get(tracksHref, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting playlist tracks:', error);
    res.status(500).send('Error getting playlist tracks');
  }
};

const getAudioFeatures = async (req, res) => {
  try {
    const accessToken = req.query.access_token;
    const trackIds = req.params.trackIds;
    const response = await axios.get(`https://api.spotify.com/v1/audio-features?ids=${trackIds}`, {
      headers: { Authorization: `Bearer ${accessToken}` },
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error getting audio features:', error);
    res.status(500).send('Error getting audio features');
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

router.get('/getUserPlaylists', getUserPlaylists);
router.get('/getPlaylistTracks/:tracksHref', getPlaylistTracks);
router.get('/getAudioFeatures/:trackIds', getAudioFeatures);
router.get('/getUserProfile', getUserProfile);
router.get('/getPlaylistById/:playlistId', getPlaylistById);

// Export the helper functions
module.exports = router;