import React from "react";
import "./navbar.css";
import nith_logo from "../../assets/nith_logo.png";
import { useNavigate } from "react-router-dom";

const Navbar = ({ color }) => {
  console.log(color);
  const navigate = useNavigate();
  const navigatetoFaqs = () =>{
    navigate('/faqs');
  };
  return (
    <>
      <nav className={`navbar-styling ${color ? "navbar-color" : ""}`}>
        <div>
          <img className="logo-styling" src={nith_logo}></img>
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
          <button className="button-styling" onClick={navigatetoFaqs}>
            FAQS
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
