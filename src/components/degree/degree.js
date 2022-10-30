import React from "react";
import Navbar from "../navbar/navbar";
import "./degree.css";
import sampleDegree from "../../assets/degree.jpg";
import { useParams } from "react-router-dom";

const Degree = ({name, rollNo}) => {

  const { rollno } = useParams();

  return (
    <>
      <Navbar color={true} />
      <div className="degree-styling">
        <div>Go Back</div>
        <section className="degree-body">
          <div>Name - {"Induja"}</div>
          <div>Roll No - {rollno} </div>
          <div>
            <img src={sampleDegree} alt="Degree"></img>
          </div>
        </section>
      </div>
    </>
  );
};

export default Degree;
