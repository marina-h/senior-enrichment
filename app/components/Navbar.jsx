import React from 'react';
import { Link } from 'react-router';

const Navbar = () => (
  <div id="main">
    <Link to="/campus">Home</Link>
    <br />
    <Link to="/student">Students</Link>
  </div>
);

export default Navbar;
