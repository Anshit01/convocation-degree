import React from "react";
import "./homepage.css";
import Navbar from "../navbar/navbar";

const Homepage = () => {
  return (
    <>
      <div className="body-background">
        <Navbar color={false} />
        <div className="home-body-main">
          <h1>Digital Degrees now available on Blockchain</h1>
        </div>

        <div className="input-properties">
          <input
            className="home-body-input"
            type="text"
            placeholder="Enter your roll no. here"
          />
        </div>
      </div>
    </>
  );
};

export default Homepage;
