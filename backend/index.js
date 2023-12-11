const express = require("express");
const cors = require("cors");
const axios = require('axios');
const bodyParser = require('body-parser');
const app = express();
const serviceAccount = require('./serviceAccountKey.json');
const { admin } = require('./firebase'); 
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

const spotifyCalls = require('./routes/spotifyCalls');
const edamamCalls = require('./routes/edamamCalls');
const firebaseCalls = require('./routes/firebaseCalls');

app.use('/api/spotify', spotifyCalls);
app.use('/api/edamam', edamamCalls);
app.use('/api/firebase', firebaseCalls);


app.post('/api/authenticate', async (req, res) => {
  try {
    const accessToken = req.body.accessToken;

    // Fetch the user's Spotify profile
    const response = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const spotifyUser = response.data;
    const firebaseUid = `spotify:${spotifyUser.id}`;

    // Create or update the user in Firebase
    await admin.auth().updateUser(firebaseUid, {
      displayName: spotifyUser.display_name,
    }).catch(async (error) => {
      if (error.code === 'auth/user-not-found') {
        await admin.auth().createUser({
          uid: firebaseUid,
          displayName: spotifyUser.display_name,
        });
      } else {
          console.log(err);
          res.sendStatus(400);
      }
    });

    // Generate the custom token
    const customToken = await admin.auth().createCustomToken(firebaseUid);

    res.json({ firebaseToken: customToken, spotifyUserId: spotifyUser.id });
  } catch (error) {
    console.error('Error generating custom token:', error);
    res.status(500).send('Error generating custom token');
  }
});

app.listen(4000, () => console.log('Server listening on port 4000'));