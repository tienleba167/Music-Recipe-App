// const express = require('express');
// const axios = require('axios');

// // create a router in express
// const router = express.Router();

// router.get('/recipes/:query', async (req, res) => {
//     const { query } = req.params;
  
//     try {
//       const response = await axios.get(
//         `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=819c5474&app_key=bca4cd40feb74bbc2c8cd267b7af4af3`
//       );
//       console.log(response.data.hits);
//       res.json(response.data.hits);
//     } catch (error) {
//       console.error('Error making Edamam API request:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // const searchRecipe = async (req, res) => {
// //     try {
// //         const response = await axios.get(
// //             `https://api.edamam.com/api/recipes/v2?type=public&q=${req.params.query}&app_id=819c5474&app_key=bca4cd40feb74bbc2c8cd267b7af4af3`
// //         );
// //         res.json(response.data.hits);
// //     } catch (error) {
// //         console.error('Error searching recipes:', error);
// //     }
// // };

// // router.get('/searchRecipe/:query', searchRecipe);

// module.exports = router;
