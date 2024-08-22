import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Auction Site</h1>
      <p>You have Logged in</p>
      <Link to="/auction"><button>All AUctions</button></Link>
      <Link to="/createauction"><button>AUction an Item</button></Link>
    </div>
  );
};

export default Home;