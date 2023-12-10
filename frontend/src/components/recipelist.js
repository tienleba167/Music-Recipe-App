import React, { useState, useEffect } from 'react';

function RecipeList({ recipes }) {
  const [loadedRecipes, setLoadedRecipes] = useState([]);

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

  // Once loadedRecipes is available, render the content
  return (
    <div>
      {loadedRecipes.map((recipeItem, index) => (
        <div key={index}>
          <h2>{recipeItem.recipe.label}</h2>
          <img src={recipeItem.recipe.image} alt={recipeItem.recipe.label} />
          <ul>
            {recipeItem.recipe.ingredients.map((ingredient, idx) => (
              <li key={idx}>{ingredient.text}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default RecipeList;
