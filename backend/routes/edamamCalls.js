const express = require('express');
const axios = require('axios');
require('dotenv').config();

// create a router in express
const router = express.Router();

router.get('/recipes/:query', async (req, res) => {
    const { query } = req.params;
    try {
        const response = await axios.get(
            `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${process.env.EDAMAM_APP_ID}&app_key=${process.env.EDAMAM_APP_KEY}`
        );
        res.json(response.data.hits);
    } catch (error) {
        console.error('Error making Edamam API request:', error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
