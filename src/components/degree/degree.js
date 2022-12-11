import React from "react";
import Navbar from "../navbar/navbar";
import "./degree.css";
import sampleDegree from "../../assets/degree.jpg";
import { useParams } from "react-router-dom";
import BackBtn from "./back.svg"
import { Link } from "react-router-dom";

const Degree = ({name, rollNo}) => {

  const { rollno } = useParams();

  return (
    <>
      <Navbar color={true} />
      <div className="degree-styling">
        <Link to="/">
          <div className="go-back">
            <img src={BackBtn} className="back-icon" alt="back-icon"/>
            <span className="back-btn"> Go Back </span>
          </div>
        </Link>
        <section className="degree-body">
          <div className="name">Name - {"Induja"}</div>
          <div className="roll">Roll No - {rollno} </div>
          <div>
            <img className="degree-display" src={sampleDegree} alt="Degree"></img>
          </div>
        </section>
      </div>
    </>
  );
};

export default Degree;
