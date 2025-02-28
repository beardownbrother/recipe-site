import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import recipeData from '../data/recipes.json';

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // In a real app, you would fetch this from an API
    // For now, we'll simulate that by finding in our local JSON
    const foundRecipe = recipeData.recipes.find(r => r.id === parseInt(id));
    if (foundRecipe) {
      setRecipe(foundRecipe);
    }
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className="loading">Loading recipe...</div>;
  }

  if (!recipe) {
    return <div className="error">Recipe not found!</div>;
  }

  return (
    <div className="recipe-detail">
      <div className="recipe-header">
        <h1 className="recipe-title">{recipe.title}</h1>
        <div className="recipe-meta">
          <span className="recipe-category">{recipe.category}</span>
          <span className="recipe-servings">Serves: {recipe.servings}</span>
          <span className="recipe-time">
            {recipe.prepTime && `Prep: ${recipe.prepTime}`}
            {recipe.cookTime && ` | Cook: ${recipe.cookTime}`}
          </span>
        </div>
      </div>
      
      <div className="recipe-image">
        <img src={`/images/${recipe.image || 'default-recipe.jpg'}`} alt={recipe.title} />
      </div>
      
      <div className="recipe-content">
        <div className="recipe-ingredients">
          <h2>Ingredients</h2>
          {Array.isArray(recipe.ingredients[0]) || 
           (recipe.ingredients[0] && typeof recipe.ingredients[0] === 'object' && recipe.ingredients[0].section) ? (
            // Handle sectioned ingredients
            recipe.ingredients.map((section, idx) => (
              <div key={idx} className="ingredient-section">
                <h3>{section.section}</h3>
                <ul>
                  {section.items.map((ingredient, i) => (
                    <li key={i}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            // Handle flat list of ingredients
            <ul>
              {recipe.ingredients.map((ingredient, idx) => (
                <li key={idx}>{ingredient}</li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="recipe-instructions">
          <h2>Instructions</h2>
          <ol>
            {recipe.instructions.map((step, idx) => (
              <li key={idx}>{step}</li>
            ))}
          </ol>
        </div>
        
        {recipe.notes && (
          <div className="recipe-notes">
            <h2>Notes</h2>
            <p>{recipe.notes}</p>
          </div>
        )}
      </div>
      
      <div className="recipe-footer">
        <Link to="/recipes" className="back-button">Back to All Recipes</Link>
      </div>
    </div>
  );
};

export default RecipeDetail;