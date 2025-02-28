import React from 'react';
import { Link } from 'react-router-dom';

const RecipeCard = ({ recipe }) => {
  return (
    <div className="recipe-card">
      <div className="recipe-card-image">
        {/* You can replace this with actual image paths once you have them */}
        <img src={`/images/${recipe.image || 'default-recipe.jpg'}`} alt={recipe.title} />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-title">{recipe.title}</h3>
        <div className="recipe-meta">
          <span className="recipe-category">{recipe.category}</span>
          <span className="recipe-time">
            {recipe.prepTime && `Prep: ${recipe.prepTime}`}
            {recipe.cookTime && ` | Cook: ${recipe.cookTime}`}
          </span>
        </div>
        <p className="recipe-description">
          {recipe.description || `A delicious ${recipe.category} recipe.`}
        </p>
        <Link to={`/recipes/${recipe.id}`} className="recipe-link">
          View Recipe
        </Link>
      </div>
    </div>
  );
};

export default RecipeCard;