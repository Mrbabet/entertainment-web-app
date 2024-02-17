import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <>
      <main>
        <div>
          <p>404</p>
          <h1>Page not found</h1>
          <p>Sorry, we couldn’t find the page you’re looking for.</p>
          <div>
            <Link to="/">Go back home</Link>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
