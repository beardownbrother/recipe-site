import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div>
      <h1>Welcome to My Recipe Site</h1>
      <p>Find delicious recipes for any occasion!</p>
      <Link to="/recipes">Browse Recipes</Link>
    </div>
  );
}

export default Home;