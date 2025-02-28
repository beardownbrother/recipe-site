import React, { useState, useEffect } from 'react';
import RecipeCard from '../components/RecipeCard';
import recipeData from '../data/recipes.json';

const RecipeList = () => {
  const [recipes, setRecipes] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  useEffect(() => {
    // In a real app, you would fetch this from an API
    setRecipes(recipeData.recipes);
    setFilteredRecipes(recipeData.recipes);
  }, []);
  
  useEffect(() => {
    // Filter recipes based on category and search term
    let results = recipes;
    
    if (selectedCategory !== 'all') {
      results = results.filter(recipe => recipe.category === selectedCategory);
    }
    
    if (searchTerm) {
      const lowercasedTerm = searchTerm.toLowerCase();
      results = results.filter(recipe => 
        recipe.title.toLowerCase().includes(lowercasedTerm) ||
        recipe.category.toLowerCase().includes(lowercasedTerm) ||
        (recipe.description && recipe.description.toLowerCase().includes(lowercasedTerm))
      );
    }
    
    setFilteredRecipes(results);
  }, [recipes, selectedCategory, searchTerm]);
  
  // Get unique categories for the filter
  const categories = ['all', ...new Set(recipes.map(recipe => recipe.category))];
  
  return (
    <div className="recipe-list-container">
      <h1>Family Recipes</h1>
      
      <div className="recipe-filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="category-filter">
          <label htmlFor="category-select">Filter by: </label>
          <select 
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="recipe-count">
        <p>{filteredRecipes.length} recipes found</p>
      </div>
      
      <div className="recipe-grid">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} />
          ))
        ) : (
          <p className="no-recipes">No recipes found. Try changing your filters.</p>
        )}
      </div>
    </div>
  );
};

export default RecipeList;