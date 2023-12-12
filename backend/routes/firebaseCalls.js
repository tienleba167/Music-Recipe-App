const express = require('express');
const router = express.Router();
const { database } = require('../firebase'); 
require('dotenv').config();

router.post('/savePlaylist', async (req, res) => {
  try {
    const { userId, playlistId, playlistName} = req.body; // Extract userId, playlistId, and additional data from request body

    // Creating or updating a playlist in the Realtime Database
    const playlistRef = database.ref(`users/${userId}/playlists/${playlistId}`);
    await playlistRef.set({
      playlistId: playlistId,
      playlistName: playlistName,
    });

    res.status(200).send('Playlist saved successfully');
  } catch (error) {
    console.error('Error saving playlist:', error);
    res.status(500).send('Error saving playlist');
  }
});

router.get('/getUserPlaylists/:userId', async (req, res) => {
    try {
      const { userId } = req.params;
      const playlistsRef = database.ref(`users/${userId}/playlists`);
      playlistsRef.once('value', (snapshot) => {
        if (snapshot.exists()) {
          const playlistsSnapshot = snapshot.val();
          const playlists = Object.keys(playlistsSnapshot).map(key => {
            return {
              playlistId: key,
              playlistName: playlistsSnapshot[key].playlistName,
            };
          });
          res.status(200).json(playlists);
        } else {
          res.status(404).send('No playlists found for user');
        }
      });
    } catch (error) {
      console.error('Error fetching user playlists:', error);
      res.status(500).send('Error fetching user playlists');
    }
  });  

module.exports = router;
