import React from "react";
import "./faqs.css";
import Navbar from "../navbar/navbar";

const Faqs = () => {
  return (
    <>
      <Navbar color={true} />
      <div className="page-styling">
        <div>Go Back</div>
        <div className="faqs-styling">
          Frequently Asked Questions
          <li>
            <ul>Why Blockchain is required?</ul>
            <ul>Is my Degree secure?</ul>
            <ul>Do I need a digital wallet?</ul>
            <ul>Where to get the wallet?</ul>
            <ul>How is it better than traditional paper documents</ul>
          </li>
        </div>
      </div>
    </>
  );
};

export default Faqs;
