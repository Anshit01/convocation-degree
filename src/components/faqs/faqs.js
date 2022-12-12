import React, { useState } from "react";
import "./faqs.css";
import Navbar from "../navbar/navbar";
import { Link } from "react-router-dom";
import BackBtn from "./back.svg"

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
        <Link to="/">
          <div className="backButton">
            <img src={BackBtn} className="back-icon" alt="back-icon"/>
            <span className="back-btn"> Go Back </span>
          </div>
        </Link>
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
              Blockchain technology can be used to securely store and manage digital documents. Because the records on a blockchain are immutable and transparent, they can be trusted and easily audited
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
              Yes, your degrees are secure. The blockchain technology is used to store your degrees. The blockchain is a decentralized, distributed, and public ledger that is used to record transactions across many computers so that any participant can verify and audit transactions. The blockchain is an append-only data structure that is resistant to modification of the data. This means that once a transaction is recorded, it cannot be altered retroactively without the alteration of all subsequent blocks and the collusion of the network.
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
              Only admin needs a wallet to issue the degrees. Students can view their degrees without a wallet.
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
              You can get the wallet from <a href="https://templewallet.com/">here!</a>
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
               Using a blockchain for digital documents allows for secure and transparent record-keeping. The documents are stored in a decentralized network, which means that there is no central authority or intermediary required to oversee or validate the records. This makes the process more secure and efficient. Additionally, because the records on a blockchain are immutable, they cannot be altered or tampered with. This ensures the integrity and authenticity of the documents.
            </div>
          </div>
        </section>
      </section>
    </>
  );
};

export default Faqs;
