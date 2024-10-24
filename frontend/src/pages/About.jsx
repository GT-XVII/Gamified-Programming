import React from 'react';
import { Link } from 'react-router-dom';

function About() {
  return (
    <div>
      <h2>About Page</h2>
      <p>This is the About page of the Gamified Programming app.</p>
      <Link to="/">Go back to Home</Link> {/* Link to navigate back to the home page */}
    </div>
  );
}

export default About;