import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">My Recipe Site</Link>
      </div>
      <nav className="main-nav">
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">All Recipes</Link></li>
          {/* Add more navigation items as needed */}
        </ul>
      </nav>
    </header>
  );
}

export default Header;