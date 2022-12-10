import React from "react";
import "./navbar.css";
import nith_logo from "../../assets/nith_logo.png";
import { Link } from "react-router-dom";

const Navbar = ({ color }) => {
  return (
    <>
      <nav className={`navbar-styling ${color ? "navbar-color" : ""}`}>
        <div>
          <Link to="/">
            <img className="logo-styling" src={nith_logo} alt="nith-logo"></img>
          </Link>
        </div>
        <div className="institute-name">
          <div className="institute-name-sub">
            राष्ट्रीय प्रौद्योगिकी संस्थान हमीरपुर
          </div>
          <div className="institute-name-sub">(राष्ट्रीय महत्व का संस्थान)</div>
          <div className="institute-name-sub">
            National Institute of Technology Hamirpur
          </div>
          <div className="institute-name-sub">
            {" "}
            (An Institute of National Importance)
          </div>
        </div>
        <div>
          <Link to="/faqs">
            <div className="button-styling">
              FAQS
            </div>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
