import React, { useState } from "react";
import "./faqs.css";
import Navbar from "../navbar/navbar";

const Faqs = () => {
  const [toggle, setToggle] = useState({
    q1: false,
    q2: false,
    q3: false,
    q4: false,
    q5: false,
  });

  return (
    <>
      <Navbar color={true} />
      <section className="wrapper">
        <div className="backButton">Go back</div>
        <section className="faqs">
          <div className="title">Frequently asked questions</div>
          <div
            className="questionWrapper q1"
            onClick={() => {
              setToggle((prevToggle) => {
                return { ...prevToggle, q1: !prevToggle.q1 };
              });
            }}
          >
            <div className="question">
              <div className="questionTextWrapper">
                Why blockchain is required ?
              </div>
              <button className="questionDropDown"></button>
            </div>
            <div
              className={`${
                toggle.q1 ? "answerWrapper show" : "answerWrapper"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus id leo id viverra. Nullam elementum metus sodales nisi
              suscipit, non blandit velit mollis. Phasellus auctor metus blandit
              eros cursus.
            </div>
          </div>
          <div
            className="questionWrapper"
            onClick={() => {
              setToggle((prevToggle) => {
                return { ...prevToggle, q2: !prevToggle.q2 };
              });
            }}
          >
            <div className="question">
              <div className="questionTextWrapper">Are my degrees secure ?</div>
              <button className="questionDropDown"></button>
            </div>
            <div
              className={`${
                toggle.q2 ? "answerWrapper show" : "answerWrapper"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus id leo id viverra. Nullam elementum metus sodales nisi
              suscipit, non blandit velit mollis. Phasellus auctor metus blandit
              eros cursus.
            </div>
          </div>

          <div
            className="questionWrapper"
            onClick={() => {
              setToggle((prevToggle) => {
                return { ...prevToggle, q3: !prevToggle.q3 };
              });
            }}
          >
            <div className="question">
              <div className="questionTextWrapper">
                Do I need a digital wallet ?
              </div>
              <button className="questionDropDown"></button>
            </div>
            <div
              className={`${
                toggle.q3 ? "answerWrapper show" : "answerWrapper"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus id leo id viverra. Nullam elementum metus sodales nisi
              suscipit, non blandit velit mollis. Phasellus auctor metus blandit
              eros cursus.
            </div>
          </div>

          <div
            className="questionWrapper"
            onClick={() => {
              setToggle((prevToggle) => {
                return { ...prevToggle, q4: !prevToggle.q4 };
              });
            }}
          >
            <div className="question">
              <div className="questionTextWrapper">
                Where to get the wallet ?
              </div>
              <button className="questionDropDown"></button>
            </div>
            <div
              className={`${
                toggle.q4 ? "answerWrapper show" : "answerWrapper"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus id leo id viverra. Nullam elementum metus sodales nisi
              suscipit, non blandit velit mollis. Phasellus auctor metus blandit
              eros cursus.
            </div>
          </div>

          <div
            className="questionWrapper"
            onClick={() => {
              setToggle((prevToggle) => {
                return { ...prevToggle, q5: !prevToggle.q5 };
              });
            }}
          >
            <div className="question">
              <div className="questionTextWrapper">
                How is it better than traditional paper documents ?
              </div>
              <button className="questionDropDown"></button>
            </div>
            <div
              className={`${
                toggle.q5 ? "answerWrapper show" : "answerWrapper"
              }`}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus
              finibus id leo id viverra. Nullam elementum metus sodales nisi
              suscipit, non blandit velit mollis. Phasellus auctor metus blandit
              eros cursus.
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Faqs;
